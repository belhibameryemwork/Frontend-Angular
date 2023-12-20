import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{

  constructor(private http: HttpClient, private produitsService :ProduitsService)
  {}
  produits: Array<Produit> = [];
  produitEdite: Produit | null = null;
<<<<<<< HEAD

  filtreCategorie: Categorie | string | null = null;

  filtrePrix: number | null = null;
=======
>>>>>>> 6e5d20bba7c002691fbb22a23e0c9d56e1216018
  
    categories: Categorie[] = [];
    nouveauProduit: Produit = {
      id: 0,
      code: '',
      designation: '',
      prix: 0,
      categorie: new Categorie()
    };
    produitCourant = new Produit();

  ngOnInit(): void {
  // Message affiché au moment de l'affichage du composant
  console.log("Initialisation du composant:.....");
  // Charger les données
  this.consulterProduits();
  this.consulterProduits();

  // Charger les catégories
  this.produitsService.getCategories().subscribe({
    next: data => {
      console.log("Succès GET Categories");
      this.categories = data;
    },
    error: err => {
      console.log("Erreur GET Categories");
    }
  });
}
    editerProduit(produit: Produit) {
      this.produitEdite = produit;
    }

    supprimerProduit(produit: Produit) {
<<<<<<< HEAD
      const confirmation = confirm("Voulez-vous supprimer le produit :" + produit.designation + " ?");
      if (confirmation) {
        this.produitsService.deleteProduit(produit.id).subscribe({
          next: () => {
            const index = this.produits.indexOf(produit);
            if (index !== -1) {
              this.produits.splice(index, 1);
            }
            this.appliquerFiltres(); // Reapply filters after deletion
          },
          error: err => {
            console.log("Erreur DELETE Produit");
          }
        });
      }
    }
    appliquerFiltres() {
      console.log('Filtre Categorie:', this.filtreCategorie);
      console.log('Filtre Prix:', this.filtrePrix);
    
      this.produits = this.filtrerProduits(this.produits, this.filtreCategorie, this.filtrePrix);
      console.log('Produits après filtrage:', this.produits);
    }

    filtrerProduits(produits: Produit[], filtreCategorie: Categorie | string | null, filtrePrix: number | null): Produit[] {
      const filteredProduits = produits.filter(produit => {
        const categorieMatch =
          filtreCategorie === null ||
          (typeof filtreCategorie === 'string'
            ? produit.categorie?.libelle === filtreCategorie
            : produit.categorie?.id === filtreCategorie?.id);
    
        const prixMatch =
          filtrePrix === null || (produit.prix !== undefined && produit.prix !== null && produit.prix === filtrePrix);
    
        console.log(
          'Produit:',
          produit.designation,
          'Categorie Match:',
          categorieMatch,
          'Prix Match:',
          prixMatch
        );
    
        return categorieMatch && prixMatch;
      });
    
      console.log('Produits après filtrage:', filteredProduits);
      return filteredProduits;
    }
    
    

    consulterProduits() {
      this.produitsService.getProduits().subscribe({
        next: data => {
          this.produits = data;
          // Apply filters after fetching products
          this.appliquerFiltres();
        },
        error: err => {
          console.log("Erreur GET Produits");
        }
      });
    }
  
=======
      let reponse: boolean = confirm("Voulez-vous supprimer le produit :" + produit.designation + " ?");
      if (reponse == true) {
        console.log("Suppression confirmée...");
  
        // Utilisez la méthode deleteProduit existante du service pour supprimer le produit
        this.produitsService.deleteProduit(produit.id)
          .subscribe({
            next: () => {
              console.log("Succès DELETE");
  
              // Retirez le produit du tableau local
              const index = this.produits.indexOf(produit);
              if (index !== -1) {
                this.produits.splice(index, 1);
              }
            },
            error: err => {
              console.log("Erreur DELETE");
            }
          });
      } else {
        console.log("Suppression annulée...");
      }
    }

    consulterProduits()
    {
      console.log("Récupérer la liste des produits");
      //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
      this.produitsService.getProduits()
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            this.produits=data;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      ) 
    }
>>>>>>> 6e5d20bba7c002691fbb22a23e0c9d56e1216018

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    this.produits.push(this.produitCourant);
    if (form.value.id != undefined)
    {
      console.log("id non vide ...");
      //flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau:boolean=true;
      let index=0;
      do{
        let p=this.produits[index];
        console.log(
          p.code + ' : ' + p.designation + ': ' + p.prix);

          if (p.id==form.value.id)
          {
            //rendre le mode à EDIT 
            nouveau=false; 
            console.log('ancien');

            let reponse:boolean = confirm("Produit existant. Confirmez vous la mise à jour de :" +p.designation+" ?");
            if (reponse==true)
            {
              //mettre à jour dans le BackEnd
              this.http.put<Array<Produit>> ("http://localhost:3333/produits/"+ form.value.id, form.value)
              .subscribe(
                {
                  next: updatedProduit=>{
                    console.log("Succès PUT");
                    //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
                    p.code=form.value.code; 
                    p.designation=form.value.designation; 
                    p.prix=form.value.prix;
                    p.categorie = form.value.categorie;
                    console.log('Mise à jour du produit:' +p.designation);
                  },
                  error: err=> { 
                    console.log("Erreur PUT"); 
                  }
                }
              )
            }
            else
            {
              console.log("Mise à jour annulée");
            }
            //Arrêter la boucle 
            return;
          }
          else{
            //continuer à boucler 
            index++;
          }
      }
      while(nouveau && index<this.produits.length);
      //en cas d'ajout
      if (nouveau)
      {
        console.log('nouveau'); 
        this.produits.push(form.value); 
        console.log("Ajout d'un nouveau produit:"+form.value.designation);
      }
    }
    else
    {
      console.log("id vide...");
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

  mettreAJourProduit() {
    if (this.produitEdite !== null && this.produitEdite !== undefined) {
      let reponse: boolean = confirm(
        "Produit existant. Confirmez-vous la mise à jour de :" +
          this.produitEdite.designation +
          " ?"
      );
      if (reponse == true) {
        // Ensure produitEdite.categorie is initialized
        if (!this.produitEdite.categorie) {
          this.produitEdite.categorie = new Categorie();
        }
  
        this.produitsService
          .updateProduit(this.produitEdite.id, this.produitEdite)
          .subscribe({
            next: updatedProduit => {
              console.log("Succès PUT");
              // Mettre à jour le produit dans le tableau local
              Object.assign(this.produitEdite as {}, updatedProduit);
            },
            error: err => {
              console.log("Erreur PUT");
            },
          });
      } else {
        console.log("Mise à jour annulée");
      }
      // Réinitialise le produitEdite après la mise à jour
      this.produitEdite = null;
    }
  }
  
  
  
  effacerSaisie() {
    this.produitCourant = new Produit(); // Réinitialise le produitCourant
  }
  
}