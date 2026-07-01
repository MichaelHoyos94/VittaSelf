<?php

use Mockery\MockInterface;
use Modules\Sanctions\Models\CatCaseStatus;
use Modules\Sanctions\Models\DisciplinaryCase;
use Modules\Sanctions\Repositories\CatCaseStatusRepository;
use Modules\Sanctions\Repositories\DisciplinaryCaseRepository;
use Modules\Sanctions\Services\DisciplinaryCaseService;

afterEach(function () {
    Mockery::close();
});

it('progresses a disciplinary case to its configured next status', function () {
    $currentStatus = new CatCaseStatus;
    $currentStatus->next_status_id = 3;

    $disciplinaryCase = new DisciplinaryCase;
    $disciplinaryCase->id = 41;
    $disciplinaryCase->case_status_id = 2;
    $disciplinaryCase->setRelation('caseStatus', $currentStatus);

    $repository = Mockery::mock(DisciplinaryCaseRepository::class, function (MockInterface $mock) use ($disciplinaryCase) {
        $mock->shouldReceive('getById')
            ->once()
            ->with(41)
            ->andReturn($disciplinaryCase);

        $mock->shouldReceive('save')
            ->once()
            ->withArgs(fn (DisciplinaryCase $case) => $case->case_status_id === 3)
            ->andReturnUsing(fn (DisciplinaryCase $case) => $case);
    });

    $statusRepository = Mockery::mock(CatCaseStatusRepository::class);
    $service = new DisciplinaryCaseService($repository, $statusRepository);

    $result = $service->progressCase(41);

    expect($result)->toBe($disciplinaryCase)
        ->and($result->case_status_id)->toBe(3);
});

it('rejects progression when the disciplinary case is already at its final status', function () {
    $finalStatus = new CatCaseStatus;
    $finalStatus->next_status_id = null;

    $disciplinaryCase = new DisciplinaryCase;
    $disciplinaryCase->id = 41;
    $disciplinaryCase->case_status_id = 5;
    $disciplinaryCase->setRelation('caseStatus', $finalStatus);

    $repository = Mockery::mock(DisciplinaryCaseRepository::class, function (MockInterface $mock) use ($disciplinaryCase) {
        $mock->shouldReceive('getById')
            ->once()
            ->with(41)
            ->andReturn($disciplinaryCase);

        $mock->shouldNotReceive('save');
    });

    $statusRepository = Mockery::mock(CatCaseStatusRepository::class);
    $service = new DisciplinaryCaseService($repository, $statusRepository);

    expect(fn () => $service->progressCase(41))
        ->toThrow(Exception::class, 'Case is already at the final status.');

    expect($disciplinaryCase->case_status_id)->toBe(5);
});
