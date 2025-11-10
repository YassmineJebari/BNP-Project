import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RecipeService, Recette, Comment } from '../recipe.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class Detail implements OnInit, OnDestroy {
  recette?: Recette;
  showDeleteModal = false;

  // Timer
  timerRunning = false;
  timeLeft = 0; // en secondes
  timerSubscription?: Subscription;

  // Shopping List
  shoppingList: { name: string, checked: boolean }[] = [];

  // Comments
  newComment: Comment = {
    author: '',
    text: '',
    rating: 0,
    date: new Date()
  };

  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getById(id).subscribe(r => {
      this.recette = r;
      if (r && r.preparationTime) {
        this.timeLeft = r.preparationTime * 60; // Convertir en secondes
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  // === VIDEO ===
  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // === FAVORITE ===
  toggleFavorite() {
    if (this.recette) {
      this.recette.isFavorite = !this.recette.isFavorite;
    }
  }

  // === TIMER ===
  startTimer() {
    if (!this.recette?.preparationTime) return;
    
    this.timerRunning = true;
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.playAlertSound();
        alert('⏰ Temps de cuisson terminé !');
      }
    });
  }

  pauseTimer() {
    this.timerRunning = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.pauseTimer();
    if (this.recette?.preparationTime) {
      this.timeLeft = this.recette.preparationTime * 60;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  playAlertSound() {
    // Jouer un son d'alerte (optionnel)
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE';
  }

  // === SHOPPING LIST ===
  generateShoppingList() {
    if (!this.recette) return;
    this.shoppingList = this.recette.ingredients.map(ing => ({
      name: ing,
      checked: false
    }));
  }

  printShoppingList() {
    const printContent = this.shoppingList.map((item, i) => 
      `${i + 1}. ${item.name}`
    ).join('\n');
    
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Liste de courses</title>');
      printWindow.document.write('<style>body { font-family: Arial; padding: 20px; } h1 { color: #00915A; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(`<h1>🛒 Liste de courses - ${this.recette?.titre}</h1>`);
      printWindow.document.write('<pre>' + printContent + '</pre>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  // === COMMENTS ===
  setRating(rating: number) {
    this.newComment.rating = rating;
  }

  addComment() {
    if (!this.recette || !this.recette.id) return;
    if (!this.newComment.author || !this.newComment.text || this.newComment.rating === 0) return;

    this.recipeService.addComment(this.recette.id, this.newComment).subscribe(() => {
      // Recharger la recette pour voir le nouveau commentaire
      if (this.recette && this.recette.id) {
        this.recipeService.getById(this.recette.id).subscribe(r => {
          this.recette = r;
        });
      }
      // Reset le formulaire
      this.newComment = {
        author: '',
        text: '',
        rating: 0,
        date: new Date()
      };
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // === DELETE ===
  confirmDelete() {
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }

  deleteRecipe() {
    if (this.recette && this.recette.id) {
      this.recipeService.delete(this.recette.id).subscribe(() => {
        this.router.navigate(['/recipes']);
      });
    }
  }
}