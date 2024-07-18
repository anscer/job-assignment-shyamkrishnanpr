import { Request, Response } from "express";
import State from "../models/State";

export const createState = async (req: Request, res: Response) => {
  const { name, description, status } = req.body;

  try {
    const newState = new State({
      name,
      description,
      status,
      createdBy: req?.user,
    });

    const state = await newState.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    state.name = name || state.name;
    state.description = description || state.description;
    state.status = status || state.status;
    state.updatedAt = new Date();
    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    await state.deleteOne();
    res.json({ message: "State removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
