import {
  CreateCategoryModel,
  DeleteCategoryDataModel,
  UpdateCategoryDataModel,
} from "../../../types/categories/categories";
import { executeQuery } from "../../config/dbConfig";

export const categoriesRepository = {
  async listCategories({ userId }: { userId: string }) {
    const query = `
      SELECT * FROM Categories
      WHERE userId = '${userId}'
    `;
    const categories = await executeQuery(query);

    return categories as any;
  },
  async categoryExists({
    categoryName,
    categoryType,
    userId,
  }: {
    categoryName: string;
    categoryType: string;
    userId: string;
  }) {
    const query = `
      SELECT * FROM Categories
      WHERE categoryName = '${categoryName}' AND categoryType = '${categoryType}' AND userId = '${userId}'
    `;
    const categories = await executeQuery(query);
    return categories.length > 0;
  },

  async categoryExistsById({
    categoryId,
    userId,
  }: {
    categoryId: string;
    userId: string;
  }) {
    const query = `
      SELECT * FROM Categories
      WHERE id = '${categoryId}' AND userId = '${userId}'
    `;
    const categories = await executeQuery(query);
    return categories.length > 0;
  },

  async createCategory({
    categoryColor,
    categoryIcon,
    categoryName,
    categoryType,
    userId,
  }: CreateCategoryModel) {
    const query = `
      INSERT INTO Categories (id, categoryColor, categoryIcon, categoryName, categoryType, userId)
      OUTPUT INSERTED.*
      VALUES (NEWID(), '${categoryColor}', '${categoryIcon}', '${categoryName}', '${categoryType}', '${userId}' )
    `;
    const categories = await executeQuery(query);

    return categories[0] as any;
  },

  async updateCategory({
    categoryColor,
    categoryIcon,
    categoryName,
    categoryType,
    userId,
    categoryId,
  }: UpdateCategoryDataModel) {
    const query = `
      UPDATE Categories
      SET categoryColor = '${categoryColor}', categoryIcon = '${categoryIcon}', categoryName = '${categoryName}', categoryType = '${categoryType}'
      OUTPUT INSERTED.*
      WHERE id = '${categoryId}' AND userId = '${userId}'
    `;
    const categories = await executeQuery(query);

    return categories[0] as any;
  },

  async deleteCategory({ categoryId, userId }: DeleteCategoryDataModel) {
    const query = `
      DELETE FROM Categories
      OUTPUT DELETED.*
      WHERE id = '${categoryId}' AND userId = '${userId}'
    `;
    const categories = await executeQuery(query);

    return categories[0] as any;
  },
};
