import { NextFunction, Request, Response } from "express";

import { EUserRole } from "../enums";
import { ApiError } from "../errors";
import { Token, User } from "../models";

class RoleMiddleware {
  public async checkAdminRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const tokenInfo = await Token.findOne({ accessToken });
      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      const user = await User.findById(tokenInfo._user_id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      if (user.role !== EUserRole.admin) {
        throw new ApiError("Недостатньо прав для створення товару.", 403);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const roleMiddleware = new RoleMiddleware();
