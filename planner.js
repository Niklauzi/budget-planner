
        // Category configuration
        const categories = [
            { key: 'savings', name: 'Savings', icon: 'fas fa-piggy-bank', class: 'category-savings' },
            { key: 'needs', name: 'Needs', icon: 'fas fa-home', class: 'category-needs' },
            { key: 'wants', name: 'Wants', icon: 'fas fa-shopping-bag', class: 'category-wants' },
            { key: 'tax', name: 'Tax', icon: 'fas fa-file-invoice-dollar', class: 'category-tax' },
            { key: 'food', name: 'Food', icon: 'fas fa-utensils', class: 'category-food' }
        ];

        function getPercentages(period) {
            return {
                needs: parseInt(document.getElementById(period + 'NeedsPercent').value) || 0,
                wants: parseInt(document.getElementById(period + 'WantsPercent').value) || 0,
                savings: parseInt(document.getElementById(period + 'SavingsPercent').value) || 0,
                tax: parseInt(document.getElementById(period + 'TaxPercent').value) || 0,
                food: parseInt(document.getElementById(period + 'FoodPercent').value) || 0
            };
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
            }).format(amount);
        }

        function createCategoryCard(category, amount, percentage) {
            return `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card category-card ${category.class} text-white">
                        <div class="card-body text-center">
                            <i class="${category.icon} icon-large"></i>
                            <h5 class="card-title mb-1">${category.name}</h5>
                            <div class="category-amount">${formatCurrency(amount)}</div>
                            <div class="category-percentage">${percentage}% of income</div>
                        </div>
                    </div>
                </div>
            `;
        }

        function calculateBudget(period) {
            const income = parseFloat(document.getElementById(period + 'Income').value);
            
            if (!income || income <= 0) {
                alert('Please enter a valid income amount');
                return;
            }

            const percentages = getPercentages(period);
            
            // Validate percentages add up to 100%
            const total = Object.values(percentages).reduce((sum, val) => sum + val, 0);
            if (total === 0) {
                alert('Please enter at least one percentage value');
                return;
            }
            if (Math.abs(total - 100) > 0.1) {
                alert(`Percentages must add up to exactly 100%. Current total: ${total}%`);
                return;
            }

            let html = '';
            let totalAllocated = 0;

            categories.forEach(category => {
                const percentage = percentages[category.key];
                const amount = (income * percentage) / 100;
                totalAllocated += amount;
                html += createCategoryCard(category, amount, percentage);
            });

            document.getElementById(period + 'Categories').innerHTML = html;
            
            const summaryText = `Total Income: ${formatCurrency(income)} | Total Allocated: ${formatCurrency(totalAllocated)} | Remaining: ${formatCurrency(0)}`;
            document.getElementById(period + 'Summary').textContent = summaryText;
            
            document.getElementById(period + 'Results').style.display = 'block';
        }

        function calculateMonthly() {
            calculateBudget('monthly');
        }

        function calculateWeekly() {
            calculateBudget('weekly');
        }

        // Initialize tooltips if needed
        document.addEventListener('DOMContentLoaded', function() {
            // Add any initialization code here
        });