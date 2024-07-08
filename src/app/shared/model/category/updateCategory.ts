import { UpdateCategoryDataModel } from "../../../types/categories/categories";
import { CustomError } from "../../utils/customErrorClass";

export interface updateCategoryModelDto {
  data: UpdateCategoryDataModel;
}

export function updateCategoryDataModel({ data }: updateCategoryModelDto) {
  const {
    categoryColor,
    categoryIcon,
    categoryName,
    categoryType,
    userId,
    categoryId,
  } = data;

  if (
    !categoryColor ||
    !categoryIcon ||
    !categoryName ||
    !categoryType ||
    !userId ||
    !categoryId
  ) {
    throw new CustomError("All fields are required", 400);
  }
  if (categoryType !== "EXPENSE" && categoryType !== "INCOME") {
    throw new CustomError("Category type must be expense or income", 400);
  }

  return {
    categoryColor,
    categoryIcon,
    categoryName,
    categoryType,
    userId,
    categoryId,
  };
}
