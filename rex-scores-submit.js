document.addEventListener('DOMContentLoaded', sendJournalMatchScores);

function sendJournalMatchScores(){  
    registerJournalMatchForms(document.querySelectorAll('form.journal-match-score, form.secondary-journal-score'));
}


function registerJournalMatchForms(nodeList){
        nodeList.forEach(function(node){
            node.addEventListener('submit', function (event) {
                let formMethod="POST";
                let activeForm = this;
                if(this.classList.contains("journal-match-score")){
                    formAction="https://script.google.com/macros/s/AKfycbxkbhm40Cyx0n4pxAV9t-hay8R096iyc0YS72t-YeMN9cKHYGwl0_KDctCF_I-SgJ4i/exec";
                }
                if(this.classList.contains("secondary-journal-score")){
                    formAction="https://script.google.com/macros/s/AKfycbzmqF5xuoM92NItLfuZXPush-yYZak66H_7zMPqNbmNs7quagxQL-PQJ_3JRvWASxXG/exec";
                }
                let formBody = new FormData(activeForm);
                let score = event.submitter ? event.submitter.value : "error";
                formBody.append("score", score);
                formBody.append("Date", new Date());
                activeForm.innerHTML="Recording...";
        
                fetch(formAction, {
                  method: formMethod,
                  body: formBody
                }).then(
                    res=>res.text())
                  .then(function () {
                    activeForm.innerHTML="Thank you for your response";
                 });
        
                event.preventDefault();
            });

        });
}