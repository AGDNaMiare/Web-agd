/**
 * Inicjalizuje dane w bazie Firebase z pliku posts.json
 * Skrypt do jednorazowego użycia przy przejściu z lokalnego JSON do Firebase
 */

async function initializeFirebaseFromJson() {
    try {
        console.log('Rozpoczynam inicjalizację Firebase z pliku JSON...');
        
        // Pobierz dane z pliku JSON
        const response = await fetch('/blog/posts.json');
        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych z pliku posts.json');
        }
        
        const jsonData = await response.json();
        
        // Utwórz instancję klasy FirebaseBlogService
        const blogService = new FirebaseBlogService();
        
        // Inicjalizuj bazę danych za pomocą danych z pliku JSON
        await blogService.initializeData(jsonData.posts, jsonData.categories);
        
        console.log('Dane zostały zainicjalizowane pomyślnie');
        return true;
    } catch (error) {
        console.error('Błąd podczas inicjalizacji danych:', error);
        return false;
    }
}

// Funkcja do migracji danych z lokalnego JSON do Firebase
function migrateToFirebase() {
    const statusElement = document.getElementById('migration-status');
    
    if (statusElement) {
        statusElement.textContent = 'Rozpoczynam migrację danych...';
        statusElement.className = 'status-info';
    }
    
    initializeFirebaseFromJson()
        .then(success => {
            if (success && statusElement) {
                statusElement.textContent = 'Migracja zakończona pomyślnie. Dane zostały zaimportowane do Firebase.';
                statusElement.className = 'status-success';
            }
        })
        .catch(error => {
            console.error('Błąd podczas migracji:', error);
            if (statusElement) {
                statusElement.textContent = `Błąd podczas migracji: ${error.message}`;
                statusElement.className = 'status-error';
            }
        });
} 