// Admin Product Management
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const addProductBtn = document.getElementById('add-product-btn');
    const productModal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const productTableBody = document.getElementById('product-table-body');
    const productForm = document.getElementById('product-form');
    
    // Sample product data (will be replaced with real data source)
    const sampleProducts = [
        {
            id: 1,
            name: "Premium Phone Case",
            status: "Active",
            inventory: 42,
            price: 24.99,
            image: "case.jpg",
            category: "Cases",
            description: "Durable protective case with shock absorption"
        },
        {
            id: 2,
            name: "Fast Charger",
            status: "Active",
            inventory: 15,
            price: 19.99,
            image: "charger.jpg",
            category: "Chargers",
            description: "20W USB-C fast charging adapter"
        },
        {
            id: 3,
            name: "Tempered Glass",
            status: "Draft",
            inventory: 0,
            price: 12.99,
            image: "protector.jpg",
            category: "Screen Protectors",
            description: "9H hardness glass screen protector"
        }
    ];

    // Modal Handling
    addProductBtn.addEventListener('click', () => {
        productModal.classList.remove('hidden');
        loadProductForm();
    });

    closeModalBtn.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.add('hidden');
        }
    });

    // Render product table
    function renderProductTable() {
        productTableBody.innerHTML = sampleProducts.map(product => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <i class="fas fa-mobile-alt text-gray-400"></i>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${product.name}</div>
                            <div class="text-sm text-gray-500">ID: ${product.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${product.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${product.inventory > 0 ? 'text-gray-500' : 'text-red-500'}">
                    ${product.inventory} in stock
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $${product.price.toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3 edit-product" data-id="${product.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-900 delete-product" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Add event listeners to action buttons
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                editProduct(productId);
            });
        });

        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                deleteProduct(productId);
            });
        });
    }

    // Load product form
    function loadProductForm() {
        productForm.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Basic Information -->
                <div class="col-span-1">
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input type="text" class="w-full px-3 py-2 border rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea class="w-full px-3 py-2 border rounded-md" rows="3"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select class="w-full px-3 py-2 border rounded-md">
                                <option>Cases</option>
                                <option>Chargers</option>
                                <option>Screen Protectors</option>
                                <option>Cables</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Pricing & Inventory -->
                <div class="col-span-1">
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Pricing & Inventory</h4>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                <input type="number" step="0.01" class="w-full px-3 py-2 border rounded-md" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Compare at Price ($)</label>
                                <input type="number" step="0.01" class="w-full px-3 py-2 border rounded-md">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Inventory</label>
                            <input type="number" class="w-full px-3 py-2 border rounded-md" value="0">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select class="w-full px-3 py-2 border rounded-md">
                                <option>Active</option>
                                <option>Draft</option>
                                <option>Archived</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Images -->
                <div class="col-span-2">
                    <h4 class="text-lg font-medium text-gray-900 mb-4">Images</h4>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div class="flex justify-center mb-2">
                            <i class="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                        </div>
                        <p class="text-sm text-gray-600">Drag & drop product images here, or click to browse</p>
                        <input type="file" class="hidden" multiple accept="image/*">
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-4" id="image-preview">
                        <!-- Image previews will appear here -->
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="col-span-2 flex justify-end space-x-3 pt-4 border-t">
                    <button type="button" class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Product
                    </button>
                </div>
            </div>
        `;
    }

    // Edit product
    function editProduct(id) {
        const product = sampleProducts.find(p => p.id === id);
        if (!product) return;

        productModal.classList.remove('hidden');
        loadProductForm();

        // In a real implementation, we would populate the form with product data
        setTimeout(() => {
            alert(`Would load form with data for product: ${product.name}`);
        }, 300);
    }

    // Delete product
    function deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            // In a real implementation, we would remove from database
            alert(`Would delete product with ID: ${id}`);
        }
    }

    // Initialize
    renderProductTable();
});