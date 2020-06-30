({
    paginator : function(component, helper, records) {
        let recordList = records;
        let paginationList = [];
        let pageSize = component.get("v.pageSize");
        let noOfPages = component.get("v.noOfPages");
        let pageNumber = component.get("v.pageNumber");
        let totalSize = (recordList !== undefined && recordList !== null) ? recordList.length : 0;
        
        component.set("v.totalSize", totalSize);
        
        if(totalSize > 0 && pageSize != undefined) {
            noOfPages = Math.ceil(totalSize/pageSize);
            component.set("v.noOfPages", noOfPages);
            //console.log("noOfPages:::", noOfPages);
            let paginationMap = new Map()
            for(let i = 0; i < noOfPages; i++) { 
                paginationMap.set(i+1,recordList.splice(0,pageSize));
            }
            console.log("paginationMap:::", paginationMap);
            component.set("v.paginationMap", paginationMap);
            pageNumber = 1;
            component.set("v.pageNumber", pageNumber);
            console.log("paginationMap.get(0):::", paginationMap.get(pageNumber));
            paginationList = paginationMap.get(pageNumber);
            
            component.set("v.paginationList", paginationList);
        }
    },
    
    onPrev : function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber") - 1;
        component.set("v.pageNumber", pageNumber);
        var paginationMap = component.get("v.paginationMap");
        component.set("v.paginationList", paginationMap.get(pageNumber));
        console.log("pageNumber::::",pageNumber);
    },
    
    onNext : function(component, event, helper) {
        var pageNumber = component.get("v.pageNumber") + 1;
        component.set("v.pageNumber", pageNumber);
        var paginationMap = component.get("v.paginationMap");
        component.set("v.paginationList", paginationMap.get(pageNumber));
        console.log("pageNumber::::",pageNumber);
    },
    
    onEnter : function(component, event, helper) {
        
        var noOfPages = component.get("v.noOfPages");
        var totalSize = component.get("v.totalSize");
        var pageNumber = component.find("search").get("v.value");
        
        if(event.which == 13 && pageNumber >= 1 && pageNumber <= noOfPages) {
            component.set("v.pageNumber", pageNumber);
            var paginationMap = component.get("v.paginationMap");
            console.log("paginationMap", paginationMap.get(pageNumber));
            component.set("v.paginationList", paginationMap.get(pageNumber));
            console.log("pageNumber::::",pageNumber);
            component.set("v.invalidPageStatus", '');
        } 
        else if(event.which == 13) {
            component.set("v.invalidPageStatus", 'Page number out of bounds!');
        }
            else if(event.altKey){
                console.log("onEnter");
                //component.find("search").select();
            }
    },
})