import multer from "multer";
import path from "node:path";

import { Router } from "express";

import { userController } from "./app/modules/controllers/user/userController";
import { transactionsController } from "./app/modules/controllers/transactions/transactionsController";
import { categoriesController } from "./app/modules/controllers/categories/categoriesController";
import { authMiddleware } from "./app/shared/middlewares/AuthMiddleware";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}--${file.originalname}`);
    },
  }),
});

router.use((req, res, next) => {
  if (req.url === "/signin" || req.url === "/signup") {
    return next();
  }
  return authMiddleware(req, res, next);
});

//list transactions
router.get("/transactions", transactionsController.listTransactions);

//create transactions
router.post("/transactions", transactionsController.createTransaction);

//edit transactions
router.patch(
  "/transactions/:transactionId",
  transactionsController.updateTransaction
);

//delete transactions
router.delete(
  "/transactions/:transactionId",
  transactionsController.deleteTransaction
);

//list user info
router.get("/me", userController.getUserInfo);

//make signin
router.post("/signin", userController.loginUser);

//make new account
router.post("/signup", userController.createUser);

// list categories
router.get("/categories", categoriesController.listCategories);

// add categories
router.post(
  "/categories",
  upload.single("image"),
  categoriesController.createCategory
);

// edit categories
router.patch(
  "/categories/:categoryId",
  upload.single("image"),
  categoriesController.updateCategory
);

// delete categories
router.delete("/categories/:categoryId", categoriesController.deleteCategory);
