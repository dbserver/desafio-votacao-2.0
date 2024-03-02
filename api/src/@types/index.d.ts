import winston = require("winston");
import CoreUser from "@app/models/CoreUser.model";
import Space from "@app/models/Space.model";
import FileSystem from "@app/services/filesrepo/filesystem";
import express from "express";
import CoreBoard from '../app/models/CoreBoard.model';
import { SpacePermission } from '../app/models/CoreSpaceEntity.model';

declare global {
    interface Error {
        status?: string
        statusDetail?: string
        statusCode?: number
    }
}
