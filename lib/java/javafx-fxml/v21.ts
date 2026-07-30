export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>
<?import javafx.geometry.Insets?>

<VBox xmlns="http://javafx.com/javafx/21"
      xmlns:fx="http://javafx.com/fxml/1"
      fx:controller="com.example.MainController"
      spacing="10"
      alignment="CENTER"
      prefHeight="400.0"
      prefWidth="600.0">
    
    <padding>
        <Insets top="20" right="20" bottom="20" left="20"/>
    </padding>
    
    <Label text="Welcome to JavaFX"
           style="-fx-font-size: 24px; -fx-font-weight: bold;"/>
    
    <Button text="Click Me"
            onAction="#handleButtonClick"/>
    
</VBox>`;
}
