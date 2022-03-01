export interface Category {
    id: string,
    name: string,
    typeImg: string
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number; //el campo taxes no lo manda el backend, este se llena desde el frontend
}

/*Se creó una segunda interfaz AddProduct que se usará para los momentos en que se mande a guardar un nuevo
producto. hereda de la interfaz anterior, pero le decimos que los campos id y category sean
omitidos. esto se debe a que para crear un nuevo producto, no le mandamos le id, ya que la base
crea el nuevo id automaticamente. Y no le mandamos una categoria de tipo Category, si no que le
mandamos el código de la categoria para que se guarde en la base.

CONCLUSIÓN: lo campos que va a pedir la segunda interfaz, son todos los de la anterior menos id
y category, y adicionalmente pedirá uno más: categoryID */

export interface  AddProduct extends Omit <Product, 'id' | 'category'>{
  categoryId: number; //solo le mandamos el código de la categoria, por el id lo crea la base.
}

/* Creamos otra interfaz para cuando hagamos update al producto. Igual que la interfaz para el
add/insert del producto, no necesitamos el id porque no se va a actualizar, ni el category, porque
lo que le mandaremos será un id y no la descripción.
Sin embargo, cuando hacemos update, no siempre vamos a actualizar todos los campos, asi que para no
mandarlos todos siempre que se haga update, se agrega el "partial", que es lo mismo que decir que
todo los campos de la interfaz son opcionales.*/

export interface UpdateProduct extends Partial<AddProduct> {

}


