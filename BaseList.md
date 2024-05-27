### Base List Component

#### Description
The `BaseListComponent` is a reusable Angular component designed to display a paginated list of items with customizable columns and row actions.

#### Usage
1. Import the `BaseListComponent` in the Angular module where it will be used.
2. Add the component selector `<app-base-list>` to the template where you want to display the list.

#### Inputs
- `columns`: An array of `Column` objects defining the columns to be displayed in the list.
- `itemService`: An instance of the service responsible for fetching and managing the items.
- `config`: Configuration options for the list display (e.g., showAddButton, showEditButton).
- `extraRowButtons`: An array of `RowButton` objects representing additional action buttons for each row.

#### Outputs
- `addButtonIsClicked`: Event emitted when the "Add" button is clicked.
- `editButtonIsClicked`: Event emitted when an item's "Edit" button is clicked.
- `deleteButtonIsClicked`: Event emitted when an item's "Delete" button is clicked.
- `extraButtonIsClicked`: Event emitted when an extra button in a row is clicked.
- `rowIsClicked`: Event emitted when a row in the list is clicked.

#### Template
```html
<app-base-list
  [columns]="columns"
  [itemService]="itemService"
  [config]="config"
  [extraRowButtons]="extraRowButtons"
  (addButtonIsClicked)="handleAddButtonClick()"
  (editButtonIsClicked)="handleEditButtonClick($event)"
  (deleteButtonIsClicked)="handleDeleteButtonClick($event)"
  (extraButtonIsClicked)="handleExtraButtonClick($event)"
  (rowIsClicked)="handleRowClick($event)">
</app-base-list>
```

#### Example Usage
```typescript
import { Component } from '@angular/core';
import { BaseModel } from "@app/base/models/BaseModel";
import { BaseService } from "@app/base/services/base.service";
import { Column } from "@app/base/models/Column";
import { RowButton } from "@app/base/models/RowButton";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  columns: Column<BaseModel>[] = [
    { label: 'ID', type: ColumnType.TEXT, value: (item: BaseModel) => item.id.toString() },
    // Add more columns as needed
  ];

  itemService: BaseService<BaseModel> = ...; // Initialize your item service

  config = {
    showAddButton: true,
    showEditButton: true
  };

  extraRowButtons: RowButton<BaseModel>[] = [
    { name: 'Custom Action', onClick: () => console.log('Custom action clicked') },
    // Add more custom row buttons as needed
  ];

  handleAddButtonClick() {
    // Handle add button click event
  }

  handleEditButtonClick(itemId: number) {
    // Handle edit button click event
  }

  handleDeleteButtonClick(itemId: number) {
    // Handle delete button click event
  }

  handleExtraButtonClick(button: RowButton<BaseModel>) {
    // Handle extra button click event
  }

  handleRowClick(item: BaseModel) {
    // Handle row click event
  }
}
```

### Base List Component Template

#### Description
The template for the `BaseListComponent` defines the layout and appearance of the list, including search functionality, column headers, item rows, and pagination.

#### Example Template
```html
<div class="h-full overflow-y-auto font-bold flex flex-col justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 bg-gray-900">
  <!-- List Header -->
  <div class="sticky top-0 p-4 block sm:flex items-center justify-between border-b lg:mt-1.5 bg-gray-800 border-gray-700">
    <!-- Breadcrumb navigation -->
    <!-- Search input -->
    <!-- Add button -->
  </div>

  <!-- Table -->
  <div class="h-5/6 overflow-y-auto">
    <table class="min-w-full divide-y table-fixed divide-gray-600">
      <!-- Table headers -->
      <!-- Table body -->
    </table>
  </div>

  <!-- Pagination -->
  <app-base-pagination [page]="page" [size]="size" [totalPages]="totalPages" (pageChange)="pageChanged($event)"></app-base-pagination>
</div>
```

### Note
This is a basic setup for the `BaseListComponent` and its template. Adjustments and enhancements can be made based on specific requirements and design preferences.
