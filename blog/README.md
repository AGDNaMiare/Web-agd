# Blog AGD Na Miarę - Instrukcja obsługi

Ten folder zawiera wszystkie pliki potrzebne do funkcjonowania bloga AGD Na Miarę.

## Struktura folderów

- `/blog/index.html` - Strona główna bloga (lista artykułów)
- `/blog/post.html` - Szablon pojedynczego artykułu
- `/blog/admin.html` - Panel administracyjny do zarządzania wpisami
- `/blog/firebase-config.js` - Konfiguracja Firebase
- `/blog/firebase-blog.js` - Warstwa dostępu do danych Firebase
- `/blog/images/` - Folder na obrazki używane w artykułach

## Konfiguracja Firebase

1. Utwórz nowy projekt w [Firebase Console](https://console.firebase.google.com/)
2. Dodaj aplikację Web do projektu
3. Skopiuj dane konfiguracyjne Firebase i wklej je w pliku `firebase-config.js`
4. Włącz Authentication w Firebase Console i dodaj użytkownika (email + hasło)
5. Włącz Firestore Database i ustaw reguły bezpieczeństwa:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Dostęp tylko dla zalogowanych użytkowników do edycji
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

6. Włącz Storage i ustaw reguły bezpieczeństwa:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Zarządzanie treścią

### 1. Logowanie do panelu administracyjnego

1. Otwórz stronę `/blog/admin.html` w przeglądarce
2. Zaloguj się używając danych utworzonych w Firebase Authentication
3. Po zalogowaniu masz dostęp do wszystkich funkcji zarządzania treścią

### 2. Dodawanie artykułów

1. Przejdź do zakładki "Dodaj nowy wpis"
2. Wypełnij wszystkie pola formularza
3. Dodaj zdjęcie główne (możesz załadować plik lub podać URL)
4. Wybierz kategorie lub utwórz nowe
5. Kliknij "Zapisz" aby zapisać artykuł w bazie danych

### 3. Migracja z poprzedniej wersji

Jeśli używałeś poprzedniej wersji bloga opartej na JSON, możesz zaimportować dane:

1. Przejdź do zakładki "Import danych"
2. Wybierz plik `posts.json` zawierający poprzednie dane
3. Kliknij "Importuj dane"

## Obsługa błędów

Jeśli wystąpią problemy z Firebase, sprawdź:

1. Czy dane konfiguracyjne w `firebase-config.js` są poprawne
2. Czy masz włączone odpowiednie usługi w Firebase Console
3. Czy reguły bezpieczeństwa pozwalają na operacje, które próbujesz wykonać
4. Logi konsoli przeglądarki, które mogą zawierać szczegółowe informacje o błędach

## Format Markdown

Treść artykułów pisana jest w formacie Markdown. Podstawowe formatowanie:

```
# Nagłówek 1
## Nagłówek 2
### Nagłówek 3

Zwykły tekst

**Pogrubienie**
*Kursywa*

- Lista punktowana
- Drugi punkt

1. Lista numerowana
2. Drugi punkt

[Link](https://przyklad.pl)

![Opis obrazka](ścieżka/do/obrazka.jpg)
```

## Rozszerzenia i ulepszenia (możliwe do zaimplementowania)

1. Dodanie bardziej zaawansowanego systemu wyszukiwania (np. Algolia)
2. Implementacja komentarzy (np. Firebase Realtime Database)
3. Dodanie statystyk odwiedzin (Firebase Analytics)
4. System tagów i powiązanych artykułów
5. Integracja z mediami społecznościowymi 