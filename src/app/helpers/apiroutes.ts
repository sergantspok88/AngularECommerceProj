export class apiroutes {
  //Cart items----------------
  static addCartItem = () => `/api/cartitems/`;

  static getCartItemsForUser = (userId: number) =>
    `/api/cartitems/user/${userId}`;

  static deleteCartItemById = (cartItemId: number) =>
    `/api/cartitems/${cartItemId}`;

  //Wishlist items----------------
  static getWishlistItemsForUser = (userId: number) =>
    `/api/wishlistitems/user/${userId}`;

  static deleteWishlistItemById = (wishlistId: number) =>
    `/api/wishlistitems/${wishlistId}`;

  static addWishlistItem = () => `/api/wishlistitems/`;

  //Products----------------
  static addProduct = () => `/api/products/`;

  static editProductById = (id: number) => `/api/products/${id}`;

  static deleteProductById = (id: number) => `/api/products/${id}`;

  static getProductsNameLikeTake = (nameLike: string, take: number) =>
    `/api/products-like/${nameLike}/${take}`;

  static getProductsByCategoryNameSkipTake = (
    categoryName: string,
    skip: number,
    take: number
  ) => `/api/products/${categoryName}/${skip}/${take}`;

  static getProductsSkipTake = (skip: number, take: number) =>
    `/api/products/${skip}/${take}`;

  static getProducts = () => `/api/products/`;

  //Categories----------------
  static getCategories = () => `/api/categories/`;

  //Users---------------------
  static getUsers = () => `/api/users/`;

  static getUserById = (id: string) => `/api/users/${id}`;

  static registerUser = () => `/api/users/register/`;

  static authenticateUser = () => `/api/users/authenticate/`;
}
