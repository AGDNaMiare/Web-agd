/**
 * Klasa obsługująca operacje związane z blogiem korzystającym z Firebase
 */
class FirebaseBlogService {
    constructor() {
        this.db = firebase.firestore();
        this.postsCollection = this.db.collection('posts');
        this.categoriesCollection = this.db.collection('categories');
    }

    /**
     * Pobierz wszystkie posty
     * @returns {Promise<Array>} - Lista postów
     */
    async getAllPosts() {
        try {
            const snapshot = await this.postsCollection.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Błąd podczas pobierania postów:', error);
            throw error;
        }
    }

    /**
     * Pobierz post po ID
     * @param {string} postId - ID posta
     * @returns {Promise<Object|null>} - Obiekt posta lub null jeśli nie znaleziono
     */
    async getPost(postId) {
        try {
            const doc = await this.postsCollection.doc(postId).get();
            if (!doc.exists) {
                return null;
            }
            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.error(`Błąd podczas pobierania posta (ID: ${postId}):`, error);
            throw error;
        }
    }

    /**
     * Dodaj nowy post
     * @param {Object} post - Dane posta
     * @returns {Promise<string>} - ID utworzonego posta
     */
    async addPost(post) {
        try {
            const docRef = await this.postsCollection.add(post);
            return docRef.id;
        } catch (error) {
            console.error('Błąd podczas dodawania posta:', error);
            throw error;
        }
    }

    /**
     * Aktualizuj istniejący post
     * @param {string} postId - ID posta do aktualizacji
     * @param {Object} postData - Nowe dane posta
     * @returns {Promise<void>}
     */
    async updatePost(postId, postData) {
        try {
            await this.postsCollection.doc(postId).update(postData);
        } catch (error) {
            console.error(`Błąd podczas aktualizacji posta (ID: ${postId}):`, error);
            throw error;
        }
    }

    /**
     * Usuń post o podanym ID
     * @param {string} postId - ID posta do usunięcia
     * @returns {Promise<void>}
     */
    async deletePost(postId) {
        try {
            await this.postsCollection.doc(postId).delete();
        } catch (error) {
            console.error(`Błąd podczas usuwania posta (ID: ${postId}):`, error);
            throw error;
        }
    }

    /**
     * Pobierz wszystkie kategorie
     * @returns {Promise<Array>} - Lista kategorii
     */
    async getAllCategories() {
        try {
            const doc = await this.categoriesCollection.doc('categories').get();
            if (!doc.exists) {
                // Utwórz dokument kategorii, jeśli nie istnieje
                await this.categoriesCollection.doc('categories').set({ categories: [] });
                return [];
            }
            return doc.data().categories || [];
        } catch (error) {
            console.error('Błąd podczas pobierania kategorii:', error);
            throw error;
        }
    }

    /**
     * Dodaj nową kategorię
     * @param {string} category - Nazwa kategorii
     * @returns {Promise<void>}
     */
    async addCategory(category) {
        try {
            const categories = await this.getAllCategories();
            if (!categories.includes(category)) {
                categories.push(category);
                await this.categoriesCollection.doc('categories').set({ categories });
            }
        } catch (error) {
            console.error(`Błąd podczas dodawania kategorii "${category}":`, error);
            throw error;
        }
    }

    /**
     * Usuń kategorię
     * @param {string} category - Nazwa kategorii do usunięcia
     * @returns {Promise<void>}
     */
    async deleteCategory(category) {
        try {
            const categories = await this.getAllCategories();
            const index = categories.indexOf(category);
            if (index !== -1) {
                categories.splice(index, 1);
                await this.categoriesCollection.doc('categories').set({ categories });
            }
        } catch (error) {
            console.error(`Błąd podczas usuwania kategorii "${category}":`, error);
            throw error;
        }
    }

    /**
     * Pobierz poprzedni i następny post względem bieżącego
     * @param {string} currentPostId - ID bieżącego posta
     * @returns {Promise<Object>} - Obiekt zawierający poprzedni i następny post
     */
    async getAdjacentPosts(currentPostId) {
        try {
            const posts = await this.getAllPosts();
            if (!posts.length) return { prev: null, next: null };

            // Sortuj posty według daty (od najnowszego)
            posts.sort((a, b) => {
                const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date);
                const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date);
                return dateB - dateA;
            });

            const currentIndex = posts.findIndex(post => post.id === currentPostId);
            if (currentIndex === -1) return { prev: null, next: null };

            const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
            const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

            return { prev, next };
        } catch (error) {
            console.error('Błąd podczas pobierania sąsiednich postów:', error);
            throw error;
        }
    }
} 