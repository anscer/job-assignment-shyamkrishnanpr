"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getStates = exports.createState = void 0;
const State_1 = __importDefault(require("../models/State"));
const createState = async (req, res) => {
    const { name, description, status } = req.body;
    try {
        const newState = new State_1.default({
            name,
            description,
            status,
            createdBy: req?.user,
        });
        const state = await newState.save();
        res.status(201).json(state);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.createState = createState;
const getStates = async (req, res) => {
    try {
        const states = await State_1.default.find();
        res.json(states);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getStates = getStates;
const updateState = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    try {
        const state = await State_1.default.findById(id);
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }
        state.name = name || state.name;
        state.description = description || state.description;
        state.status = status || state.status;
        state.updatedAt = new Date();
        await state.save();
        res.json(state);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State_1.default.findById(id);
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }
        await state.deleteOne();
        res.json({ message: "State removed" });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteState = deleteState;
