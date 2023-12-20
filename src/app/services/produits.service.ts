import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';
import { Categorie } from '../model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:3333/produits/";

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  deleteProduit(idP: number | undefined): Observable<void> {
    return this.http.delete<void>(this.urlHote +"delete"+ idP);
  }

  addProduit(nouveau: Produit): Observable<Array<Produit>> {
    return this.http.post<Array<Produit>>(this.urlHote, nouveau);
  }

  updateProduit(idP: number | undefined, nouveau: Produit): Observable<void> {
    return this.http.put<void>(this.urlHote + idP, nouveau);
  }

  getCategories(): Observable<Array<Categorie>> {
    const urlCategories = "http://localhost:3333/categories/";
    return this.http.get<Array<Categorie>>(urlCategories);
  }  
}
