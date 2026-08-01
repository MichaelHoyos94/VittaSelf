<?php

namespace App\Services;

use App\Models\Cart;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private UserRepository $userRepository) {}

    public function getAll($search)
    {
        return $this->userRepository->getAll($search);
    }

    public function create($data)
    {
        return DB::transaction(function () use ($data) {
            // Crear el usuario
            $user = $this->userRepository->create($data);

            // Rol por defecto de empresarios
            $user->assignRole('eui');

            // Generamos y asignamos eui_code
            $nextEuiCode = $this->userRepository->generateNextEuiCode();
            $user->eui_code = $nextEuiCode;
            $this->userRepository->update($user);

            // Crear el carro
            $cart = new Cart();
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
}
