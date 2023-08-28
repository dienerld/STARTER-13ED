import { Request, Response } from "express";
import {
  getGrowdevers,
  getGrowdeversSync,
  saveGrowdevers,
  saveGrowdeversSync,
} from "../db/growdevers";
import { Growdever } from "../models/growdever";

export class GrowdeverController {
  getAll(request: Request, response: Response) {
    const { name, status } = request.query;

    let growdevers = getGrowdeversSync().map((grow) => {
      return grow.toJson();
    });

    if (name || status) {
      growdevers = growdevers.filter((growdever) => {
        let filterName = true;
        let filterStatus = true;

        if (name) {
          filterName = growdever.name
            .toLowerCase()
            .includes(name.toString().toLowerCase());
        }

        if (status) {
          filterStatus =
            growdever.status.toUpperCase() === status.toString().toUpperCase();
        }

        return filterName && filterStatus;
      });
    }

    return response.json(growdevers);
  }

  getById(request: Request, response: Response) {
    const { id } = request.params;

    const growdever = getGrowdeversSync().find(
      (growdever) => growdever.id === id
    );

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    return response.status(200).json(growdever.toJson());
  }

  create(request: Request, response: Response) {
    const { name, cpf, birth, skills } = request.body;

    if (skills && !(skills instanceof Array)) {
      return response.status(400).json({ error: "Skills no formado inválido" });
    }

    const growdever = new Growdever(name, birth, cpf, skills);

    const growdevers = getGrowdeversSync();

    growdevers.push(growdever);

    saveGrowdeversSync(growdevers);

    return response.json(growdever.toJson());
  }

  remove(request: Request, response: Response) {
    const { id } = request.params;

    const growdeversDB = getGrowdeversSync();

    const indexGrowdever = growdeversDB.findIndex(
      (growdever) => growdever.id === id
    );

    if (indexGrowdever < 0) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    growdeversDB.splice(indexGrowdever, 1);

    saveGrowdeversSync(growdeversDB);

    return response.status(200).json();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, birth, status } = request.body;

    const growdeversDB = await getGrowdevers();

    const growdever = growdeversDB.find((growdever) => growdever.id === id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.updateInformation(name, new Date(birth), status);
      await saveGrowdevers(growdeversDB);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(growdever.toJson());
  }
}
