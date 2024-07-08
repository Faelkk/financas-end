import { Request, Response } from "express";
import { handleError } from "../../../shared/utils/errorHandler";
import { CreateCategoryModel } from "../../../types/categories/categories";
import { createCategoryModel } from "../../../shared/model/category/createCategory";
import { categoriesService } from "../../services/categories/categoriesService";
import { updateCategoryDataModel } from "../../../shared/model/category/updateCategory";
import { activeUserId } from "../../../shared/helpers/activeUserId";
import { deleteCategoryDataModel } from "../../../shared/model/category/deleteCategory";

export const categoriesController = {
  async listCategories(req: Request, res: Response) {
    const { userId } = await activeUserId(req);
    try {
      const categories = await categoriesService.listCategories({
        userId,
      });

      return res.status(200).send(categories);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async createCategory(req: Request, res: Response) {
    const updateData = req.body;
    const imagePath = req.file?.filename;
    const { userId } = await activeUserId(req);

    const data = {
      ...updateData,
      categoryIcon: imagePath,
      userId: userId,
    } as CreateCategoryModel;
    try {
      const {
        categoryColor,
        categoryIcon,
        categoryName,
        categoryType,
        userId,
      } = createCategoryModel({ data });

      const category = await categoriesService.createCategory({
        categoryColor,
        categoryIcon,
        categoryName,
        categoryType,
        userId,
      });

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async updateCategory(req: Request, res: Response) {
    const imagePath = req.file?.filename;
    const { categoryId } = req.params as { categoryId: string };
    const updateData = req.body;
    const { userId } = await activeUserId(req);

    const data = {
      ...updateData,
      categoryId,
      categoryIcon: imagePath,
      userId: userId,
    };
    try {
      const {
        categoryColor,
        categoryIcon,
        categoryName,
        categoryType,
        userId,
        categoryId,
      } = updateCategoryDataModel({ data });

      const category = await categoriesService.updateCategory({
        categoryColor,
        categoryIcon,
        categoryName,
        categoryType,
        userId,
        categoryId,
      });

      return res.status(200).send(category);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async deleteCategory(req: Request, res: Response) {
    const { categoryId } = req.params as { categoryId: string };
    const { userId } = await activeUserId(req);
    try {
      const { categoryId: CategoryIdDto } = deleteCategoryDataModel({
        categoryId,
      });

      const category = await categoriesService.deleteCategory({
        categoryId: CategoryIdDto,
        userId,
      });

      return res.status(200).send({ deleted: true });
    } catch (error) {
      return handleError(error, res);
    }
  },
};
