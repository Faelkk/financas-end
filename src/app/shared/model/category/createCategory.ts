import { CreateCategoryModel } from "../../../types/categories/categories";
import { CustomError } from "../../utils/customErrorClass";

export interface createCategoryModelDto {
  data: CreateCategoryModel;
}

export function createCategoryModel({ data }: createCategoryModelDto) {
  const { categoryColor, categoryIcon, categoryName, categoryType, userId } =
    data;

  if (
    !categoryColor ||
    !categoryIcon ||
    !categoryName ||
    !categoryType ||
    !userId
  ) {
    throw new CustomError("All fields are required", 400);
  }
  if (categoryType !== "EXPENSE" && categoryType !== "INCOME") {
    throw new CustomError("Category type must be expense or income", 400);
  }

  return { categoryColor, categoryIcon, categoryName, categoryType, userId };
}
