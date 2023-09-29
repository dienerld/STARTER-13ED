import { Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Result } from "../../../shared/utils/result.helper";
import {
  ApplyJobUsecase,
  CreateJobUsecase,
  ListApplicationsUsecase,
  ListCandidatesByJobUsecase,
  UpdateStatusJob,
} from "../usecase";

export class JobsController {
  static async createJob(req: Request, res: Response) {
    const dados = req.body;
    const { id } = req.user;

    try {
      const usecase = new CreateJobUsecase();
      const result = await usecase.execute({
        idRecruiter: id,
        ...dados,
      });

      return httpHelper.success(res, result);
    } catch (err: any) {
      return httpHelper.badRequestError(res, Result.error(500, err.toString()));
    }
  }

  static async applyJob(req: Request, res: Response) {
    const { idJob } = req.params;
    const { id } = req.user;

    try {
      const usecase = new ApplyJobUsecase();
      const result = await usecase.execute({ idJob, idCandidate: id });

      if (!result.ok) {
        return httpHelper.badRequestError(res, result);
      }

      return httpHelper.success(res, result);
    } catch (err: any) {
      return httpHelper.badRequestError(res, Result.error(500, err.toString()));
    }
  }

  static async listApplications(req: Request, res: Response) {
    const { id } = req.user;
    try {
      const usecase = new ListApplicationsUsecase();
      const result = await usecase.execute(id);
      return httpHelper.success(res, result);
    } catch (err: any) {
      return httpHelper.badRequestError(res, Result.error(500, err.toString()));
    }
  }

  static async listCandidatesByJob(req: Request, res: Response) {
    const { idJob } = req.params;
    const { id } = req.user;

    try {
      const usecase = new ListCandidatesByJobUsecase();
      const result = await usecase.execute(idJob, id);

      if (!result.ok) {
        return httpHelper.badRequestError(res, result);
      }
      return httpHelper.success(res, result);
    } catch (err: any) {
      return httpHelper.badRequestError(res, Result.error(500, err.toString()));
    }
  }

  static async updateStatus(req: Request, res: Response) {
    const { isOpen } = req.body;
    const { idJob } = req.params;

    try {
      const usecase = new UpdateStatusJob();
      const result = await usecase.execute(idJob, isOpen);

      if (!result.ok) {
        return httpHelper.badRequestError(res, result);
      }

      return httpHelper.success(res, result);
    } catch (err: any) {
      return httpHelper.badRequestError(res, Result.error(500, err.toString()));
    }
  }
}
