import { Categorie } from './Categorie';

export class Produit {
  id: number | undefined;
  code: string | undefined;
  designation: string | undefined;
  prix: number | undefined;
  categorie: Categorie | undefined;
}
