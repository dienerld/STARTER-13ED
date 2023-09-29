import { Router } from "express";
import {
  auth,
  onlyAdmin,
  onlyCandidate,
  onlyRecruiter,
} from "../../shared/middlewares";
import { JobsController } from "./controllers";
import { createJobValidator } from "./middlewares";

export default () => {
  const router = Router();

  router.post(
    "/jobs",
    [auth, onlyRecruiter, createJobValidator],
    JobsController.createJob
  ); //Cadastro de vagas pelo recrutador - Requisito 5 ✅
  router.post(
    "/jobs/:idJob/apply",
    [auth, onlyCandidate],
    JobsController.applyJob
  ); // Aplicação de uma vaga pelo candidato - Requisito 6 ✅
  router.get(
    "/jobs-candidate",
    [auth, onlyCandidate],
    JobsController.listApplications
  ); // Listagem de vagas do candidato - Requisito 7 ✅
  router.get(
    "/jobs/:idJob/candidates",
    [auth, onlyRecruiter],
    JobsController.listCandidatesByJob
  ); // Listagem de candidatos de uma vaga - Requisito 8 ✅
  router.get(
    "/jobs-by-recruiter",
    [auth, onlyRecruiter] /* aqui o controller */
  ); // Listagem de vagas cadastradas e seus candidatos - Requisito 9
  router.put(
    "/jobs/:idJob",
    [auth, onlyRecruiter],
    JobsController.updateStatus
  ); // Desativação/Ativação de uma vaga - Requisito 10
  router.delete("/jobs/:idJob", [auth, onlyRecruiter] /* aqui o controller */); // Exclusão de uma vaga - Requisito 11
  router.get("/jobs/reports", [auth, onlyAdmin] /* aqui o controller */); // Relatórios de pesquisa sobre vagas - Requisito 12

  return router;
};

// 1 - Repository
// 2 - Usecase
// 3 - Controller
// 4 - Validator (se precisar)
