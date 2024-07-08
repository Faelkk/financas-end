export interface CategoryModel {
  categoryName: string;
  categoryColor: string;
  categoryType: "EXPENSE" | "INCOME";
  categoryIcon: string;
}

export interface CreateCategoryModel extends CategoryModel {
  userId: string;
}

export interface UpdateCategoryDataModel extends CreateCategoryModel {
  categoryId: string;
}

export interface DeleteCategoryDataModel {
  categoryId: string;
  userId: string;
}
