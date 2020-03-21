document.addEventListener('DOMContentLoaded', function() {
   var choiceChips = document.getElementById('alternatives');
   var choiceChipsInstances = M.Chips.init(choiceChips, {
     placeholder: "Add your choice",
     secondaryPlaceholder: "+ choice",
     onChipAdd: null,
   });

   var criteriaChips = document.getElementById('criterion')
   var criteriaChipsInstances = M.Chips.init(criteriaChips, {
     placeholder: "Add your criteria",
     secondaryPlaceholder: "+ criteria",
     onChipAdd: null,
   });
 });
