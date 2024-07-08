import { categoriesRepository } from "../../../shared/repository/categories/categoriesRepository";
import { CustomError } from "../../../shared/utils/customErrorClass";
import {
  CreateCategoryModel,
  DeleteCategoryDataModel,
  UpdateCategoryDataModel,
} from "../../../types/categories/categories";

export const categoriesService = {
  async listCategories({ userId }: { userId: string }) {
    const category = await categoriesRepository.listCategories({
      userId,
    });

    if (!category) {
      throw new CustomError("Erro ao buscar categorias", 500);
    }

    return category;
  },
  async createCategory({
    categoryColor,
    categoryIcon,
    categoryName,
    categoryType,
    userId,
  }: CreateCategoryModel) {
    const categoryExists = await categoriesRepository.categoryExists({
      categoryName,
      categoryType,
      userId,
    });

    if (categoryExists) {
      throw new CustomError(
        "Categoria já existe com o mesmo nome e tipo.",
        400
      );
    }

    const category = await categoriesRepository.createCategory({
      categoryColor,
      categoryIcon,
      categoryName,
      categoryType,
      userId,
    });

    if (!category) {
      throw new CustomError("Erro ao criar categoria", 500);
    }

    return category;
  },
  async updateCategory({
    categoryColor,
    categoryIcon,
    categoryName,
    categoryType,
    userId,
    categoryId,
  }: UpdateCategoryDataModel) {
    const categoryExists = await categoriesRepository.categoryExistsById({
      categoryId,
      userId,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma categoria encontrada para esse id", 404);
    }

    const category = await categoriesRepository.updateCategory({
      categoryColor,
      categoryIcon,
      categoryName,
      categoryType,
      userId,
      categoryId,
    });

    if (!category) {
      throw new CustomError("Erro ao atualizar categoria", 500);
    }

    return category;
  },
  async deleteCategory({ categoryId, userId }: DeleteCategoryDataModel) {
    const categoryExists = await categoriesRepository.categoryExistsById({
      categoryId,
      userId,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma categoria encontrada para esse id", 404);
    }

    const category = await categoriesRepository.deleteCategory({
      userId,
      categoryId,
    });

    if (!category) {
      throw new CustomError("Erro ao deletar categoria", 500);
    }

    return category;
  },
};
