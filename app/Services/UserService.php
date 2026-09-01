<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Sanctions\Exceptions\UserSanctionedException;
use Modules\Sanctions\Services\SanctionEnforcementService;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private UserRepository $userRepository,
        private SanctionEnforcementService $sanctionEnforcementService
    ) {}

    public function getAll($search)
    {
        return $this->userRepository->getAll($search);
    }

    public function create($data)
    {
        return DB::transaction(function () use ($data) {
            $data = $this->prepareData($data);

            // Crear el usuario
            $user = $this->userRepository->create($data);

            // Rol por defecto de empresarios
            $user->assignRole('eui');

            // Generamos y asignamos eui_code
            $nextEuiCode = $this->userRepository->generateNextEuiCode();
            $user->eui_code = $nextEuiCode;
            $this->userRepository->update($user);

            // Crear el carro
            $cart = new Cart;
            $cart->user_id = $user->id;
            $cart->save();

            return $user->fresh('roles');
        });
    }

    public function getById($id)
    {
        return $this->userRepository->getById($id);
    }

    public function getByEuiCode($euiCode)
    {
        return $this->userRepository->getByEuiCode($euiCode);
    }

    public function getRepresentedUsers(User $user)
    {
        return $this->userRepository->getRepresentedUsers($user);
    }

    public function getRepresentativeCandidate(?string $euiCode): ?array
    {
        if (! $euiCode) {
            return null;
        }

        $candidate = $this->userRepository->getRepresentativeCandidateByEuiCode($euiCode);

        if (! $candidate || ! $candidate->hasRole('eui')) {
            return [
                'user' => null,
                'is_available' => false,
                'message' => 'No EUI was found with this code.',
                'sanctions' => [],
            ];
        }

        $activeSanctions = $this->sanctionEnforcementService->getUserSanctions($candidate->id);
        $blockingSanction = $activeSanctions->contains('SUSPEND_ACCOUNT', true)
            || $activeSanctions->contains('SUSPEND_CODE', true);
        $inactive = $candidate->trashed();

        return [
            'user' => [
                'id' => $candidate->id,
                'full_name' => $candidate->full_name,
                'name' => $candidate->name,
                'last_name' => $candidate->last_name,
                'email' => $candidate->email,
                'document_number' => $candidate->document_number,
                'eui_code' => $candidate->eui_code,
            ],
            'is_available' => ! $inactive && ! $blockingSanction,
            'message' => match (true) {
                $inactive => 'This EUI is inactive and cannot add entrepreneurs to their network.',
                $blockingSanction => 'This EUI has an active sanction and cannot add entrepreneurs to their network.',
                default => 'This EUI can represent the new entrepreneur.',
            },
            'sanctions' => $activeSanctions->map(fn ($sanction) => [
                'SUSPEND_ACCOUNT' => $sanction->SUSPEND_ACCOUNT,
                'SUSPEND_CODE' => $sanction->SUSPEND_CODE,
            ])->values(),
        ];
    }

    private function prepareData(array $data): array
    {
        $representativeEuiCode = $data['representative_eui_code'] ?? null;
        unset($data['representative_eui_code']);

        if (! $representativeEuiCode) {
            return $data;
        }

        $representative = $this->userRepository->getRepresentativeByEuiCode($representativeEuiCode);

        if (! $representative) {
            throw ValidationException::withMessages([
                'representative_eui_code' => 'The representative must be an existing EUI.',
            ]);
        }

        $activeSanctions = $this->sanctionEnforcementService->getUserSanctions($representative->id);

        if ($activeSanctions->contains('SUSPEND_ACCOUNT', true) || $activeSanctions->contains('SUSPEND_CODE', true)) {
            throw new UserSanctionedException('The representative has an active sanction and cannot add entrepreneurs to their network.');
        }

        $data['representative_id'] = $representative->id;

        return $data;
    }
}
