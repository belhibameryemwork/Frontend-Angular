import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  nouveauProduit: Produit = new Produit();
  categories: Categorie[] = [];

  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    // Fetch existing products on component initialization
    this.produitsService.getProduits().subscribe(
      data => {
        console.log("Produits existants", data);
      },
      error => {
        console.error("Erreur lors de la récupération des produits existants", error);
      }
    );
  
    // Fetch categories and populate the categories array
    this.produitsService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    );    
  }
  

  validerFormulaire(form: NgForm) {
    if (form.value.id !== undefined) {
      alert("Identificateur de produit déjà existant..");
    } else {
      this.ajouterProduit();
      form.resetForm();
    }
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.nouveauProduit).subscribe(
      addedProduct => {
        console.log("Nouveau produit ajouté", addedProduct);
      },
      error => {
        console.error("Erreur lors de l'ajout d'un nouveau produit", error);
      }
    );
  }
  effacerSaisie() {
    this.nouveauProduit = new Produit();
  }
}
