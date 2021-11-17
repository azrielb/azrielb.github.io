this.open_audio = (action, id) => {
    link = 'http://old2.ih.chabad.info/php/audio.php?action=' + action + '&id=' + id;
    fetch(link)
        .then(function(response) {        
            return response.text()
        })
        .then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            newLink = doc.body.querySelectorAll("param")[1].value.split('?ram=')[1];
            
            // fix the links part 
            fetch(newLink)
            .then(response => response.text())
            .then(text => {
              let linksArr = text.toString().split("\r\n");
				let address = null;
				let name = null;
				var resul = `<ul>`;
              for (i =0; i< linksArr.length; i++) {
                var splitted = linksArr[i].split('=');
				if (splitted[0].startsWith('&name')){
					name = splitted[1].slice(0 ,-1);
					resul += '<li>' + name + '<audio controls="controls" preload="none" width="640" src="' + address + '"></audio></li>';					
				} else if (splitted[0].startsWith('&var')){
					address = splitted[1].slice(0 ,-1)
				}
              }
              resul += `</ul>`;
			  
			  
              let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
			  win.document.head.innerHTML += '<meta http-equiv="content-type" content="text/html;charset=windows-1255">';
              win.document.body.innerHTML = resul;          
              });               
        })
        .catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
        });
    }