<?php
namespace Modules\Sanctions\Services;
use Modules\Sanctions\Repositories\CatCaseStatusRepository;
class CatCaseStatusService
{
    public function __construct(protected CatCaseStatusRepository $repository){}
    public function getAllStatuses()
    {
        return $this->repository->getAll();
    }
}
