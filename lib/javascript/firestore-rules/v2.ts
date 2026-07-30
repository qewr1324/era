export function generate(params: any): string {
	return `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null 
        && request.auth.uid == resource.data.authorId;
    }
    
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.token.role == 'admin';
    }
  }
}`;
}
