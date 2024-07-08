import { CustomError } from "../../utils/customErrorClass";

export interface deleteCategoryModelDto {
  categoryId: string;
}

export function deleteCategoryDataModel({
  categoryId,
}: deleteCategoryModelDto) {
  if (!categoryId) {
    throw new CustomError("CategoryId is required", 400);
  }

  return { categoryId };
}
