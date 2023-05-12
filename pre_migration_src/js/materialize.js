document.addEventListener('DOMContentLoaded', function() {
   var choiceChips = document.getElementById('choices-input');
   var choiceChipsInstances = M.Chips.init(choiceChips, {
     placeholder: "Add your choice",
     secondaryPlaceholder: "+ choice",
     onChipAdd: null,
   });

   var criteriaChips = document.getElementById('criterion-input');
   var criteriaChipsInstances = M.Chips.init(criteriaChips, {
     placeholder: "Add your criteria",
     secondaryPlaceholder: "+ criteria",
     onChipAdd: null,
   });
 });
