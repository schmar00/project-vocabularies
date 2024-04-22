var Editor = {

    TOPIC_LIST: ['skos:prefLabel', 'skos:altLabel', 'skos:hiddenLabel', 'skos:definition', 'skos:scopeNote', 'skos:notation', 'dcterms:description'],

    /* call on page startup - editor functionality initialize */
    initialize: function () {
        Editor.loggedIn = 0;

        if (window.sessionStorage) {
            Editor.__authHeader = window.sessionStorage.getItem("__authHeader");
        }

        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('uri')) {
            Editor.uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection

            $("div.container").append(`
<div id="editorModal" class="modal fade" id="editorModalCenter" tabindex="-1" role="dialog" aria-labelledby="editorModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width:1024px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editorModalTitle">Editor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="newValue" class="col-form-label">New text:</label>
            <textarea class="form-control" name="newValue" id="newValue" rows="7"></textarea>
          </div>
          <div class="form-group" id="divLanguage">
            <label for="language" class="col-form-label">Language:</label>
            <input type="text" class="form-control" name="language" id="language" disabled />
          </div>
          <div class="form-group" id="divPreviewValue">
            <label for="newValue" class="col-form-label">Current proposed value:</label>
            <textarea class="form-control" name="previewValue" id="previewValue" rows="7" readonly="readonly"></textarea>
          </div>
          <input type="hidden" class="form-control" name="attribute" id="attribute" />
          <input type="hidden" class="form-control" name="oldValue" id="oldValue" />
          <input type="hidden" class="form-control" name="uri" id="uri" />
          <input type="hidden" class="form-control" name="index" id="index" />
        </form>
        <p id="result" class="text-danger"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" name="send_email" onclick="Editor.saveAttribute();">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div id="loginModal" class="modal fade" id="loginModalCenter" tabindex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalTitle">Log in to request a content update</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="userName" class="col-form-label">Username:</label>
            <input type="text" class="form-control" name="userName" id="userName" />
          </div>
          <div class="form-group">
            <label for="userName" class="col-form-label">Password:</label>
            <input type="password" class="form-control" name="password" id="password" />
          </div>
        </form>
        <p id="result" class="text-danger"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="Editor.handleLogin();">Login</button>
      </div>
    </div>
  </div>
</div>
<div id="previewModal" class="modal fade" id="previewModalCenter" tabindex="-1" role="dialog" aria-labelledby="previewModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width:1024px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="previewModalTitle">Editor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="newValue" class="col-form-label">Proposed value:</label>
            <textarea class="form-control" name="previewValue" id="previewValue" rows="7" readonly="readonly"></textarea>
          </div>
          <div class="form-group">
            <label for="user" class="col-form-label">Posted by user:</label>
            <input type="text" class="form-control" name="user" id="user" readonly="readonly" />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`);

            Editor.startLink = `<i class="fas fa-pen"></i>&nbsp; edit texts`;
            Editor.stopLink = `<i class="fas fa-check"></i>&nbsp; stop editing`;

            $("#editorLink").html(Editor.startLink);

            Editor.keepAlive();
        }
    },

    __handleTimeout: null,
    keepAlive: function () {
        if (Editor.__handleTimeout)
            clearInterval(Editor.__handleTimeout);
        $.ajax({
            type: "GET",
            //url: "https://ticket.geoinformation.dev/ws/keep_aliveCors.php", 
            url: "https://resource.geosphere.at/updatetool/ws/keep_aliveCors.php",
            //url: "ws/keep_aliveCors.php",
            CORS: true,
            secure: true,
            beforeSend: function (xhr) {
                if (Editor.__authHeader)
                    xhr.setRequestHeader("Authorization", Editor.__authHeader);
            },
            success: function (data) {
                if (data.status == "ok") {
                    Editor.loggedIn = 1;
                    Editor.__handleTimeout = setInterval(function () {
                        $.ajax({
                            type: "GET",
                            //url: "https://ticket.geoinformation.dev/ws/keep_aliveCors.php",
                            url: "https://resource.geosphere.at/updatetool/ws/keep_aliveCors.php",
                            //url: "ws/keep_aliveCors.php",
                            CORS: true,
                            secure: true,
                            beforeSend: function (xhr) {
                                if (Editor.__authHeader)
                                    xhr.setRequestHeader("Authorization", Editor.__authHeader);
                            },
                            success: function (data) {
                            }, error: function (e) {
                            }
                        });
                    }, 60000);
                }
            }, error: function (e) {
            }
        });
    },

    /* call on edit button click - check the login and switch to edit mode on success */
    start: function (_after) {
        if (!Editor.started) {
            if (!Editor.loggedIn) {
                Editor.savedEditData = null;
                Editor.login();
                return;
            }
            Editor.started = 1;
            $("#editorLink").html(Editor.stopLink);
            // add edit icons to topics
            let topicRows = $("table#details tr");
            topicRows.each(function (index) {
                let r = $(this);
                var attribute = $("td:nth-child(1)", r);
                var content = $("td:nth-child(2) li", r);
                let count = content.length;
                content.each(function (index) {
                    let c = $(this);
                    let lang = $("span.lang", c).text();
                    let h = c.html();
                    let orig_h = h;
                    let ix = h.indexOf("<span class=\"lang\"");
                    if (ix > 0)
                        h = h.substring(0, ix);
                    let attr = attribute.text().trim();
                    let val = h.trim().replace(/^\s+|\s+$/g, "").replaceAll("\"", "\\\"").replaceAll("\'", "\\\'");
                    if (Editor.TOPIC_LIST.includes(attr)) {
                      console.log("Before newContent line:", val);
                      let newContent = orig_h + "&nbsp;&nbsp;<a class='editorLink' title='Edit value' href='javascript:Editor.editAttribute(\"" + attr + "\"," + (count > 1 ? index : null) + ", \"" + val + "\", \"" + lang + "\"@@proposed);'><i class=\"fas fa-pen\"></i></a> ";
                      console.log("After newContent line:", newContent);

                        $.ajax({
                            type: "POST",
                            //url: "https://www.geolba.net/editor/ws/get_topicCors.php",
                            url: "https://resource.geosphere.at/updatetool/ws/get_topicCors.php", //#TODO
                            //url: "ws/get_topicCors.php",
                            data: { uri: Editor.uri, oldValue: val, attribute: attr, index: (count > 1 ? index : null), language: lang },
                            CORS: true,
                            secure: true,
                            beforeSend: function (xhr) {
                                if (Editor.__authHeader)
                                    xhr.setRequestHeader("Authorization", Editor.__authHeader);
                            },
                            success: function (data) {
                                //alert(data.result);
                    
                                if (data.result != null) {
                                    let preview = data.result.NEW_VALUE.trim().replace(/^\s+|\s+$/g, "").replaceAll("\"", "\\\"").replaceAll("\'", "\\\'");
                                    newContent = newContent.replace("@@proposed", ",\"" + preview + "\"");
                                    newContent += ("&nbsp;<a class='previewLink' href='javascript:Editor.previewAttribute(\"" + attr + "\",\"" + preview + "\", \"" + data.result.CREATED_USER + "\");'><small><font color='red'>" + preview + "</font></small></a> ");
                                }
                                else
                                    newContent = newContent.replace("@@proposed", "");
                                c.html(newContent);
                                if (_after)
                                    _after();
                            }/*, error: function (e) {
                                newContent = newContent.replace("@@proposed", ",\"" + preview + "\"");
                                c.html(newContent);
                                $("#result", form).html(e.responseText);
                                
                            } */
                        });
                    }
                });
            });
        }
        else {
            $("a.editorLink").remove();
            $("a.previewLink").remove();
            Editor.started = 0;
            $("#editorLink").html(Editor.startLink);
            if (_after)
                _after();
        }
    },

    login: function () {
        Editor.loggedIn = 0;
        let form = $('#loginModal');
        $("#result", form).html(null);
        form.modal('toggle');
    },

    __authHeader: null,
    handleLogin: function () {
        let form = $('#loginModal');
        let user = $("#userName", form).val();
        let pwd = $("#password", form).val();

        if (!(user && pwd)) {
            $("#result", form).html("Please enter valid Username and Password.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "https://resource.geosphere.at/updatetool/ws/loginCors.php", 
            //url: "ws/login.php",
            data: { user: user, password: pwd },
            CORS: true,
            secure: true,
            success: function (data) {
                Editor.loggedIn = 1;
                Editor.__authHeader = "Basic " + btoa(user + ":" + pwd);
                window.sessionStorage.setItem("__authHeader", Editor.__authHeader);
                form.modal('hide');
                Editor.keepAlive();
                if (Editor.savedEditData) {
                    // restore after login - if saved before
                    let p = Editor.savedEditData;
                    Editor.editAttribute(p[0], p[1], p[2], p[3]);
                } else if (!Editor.started) {
                    Editor.start();
                }
            }, error: function (e) {
                $("#result", form).html(e.responseJSON ? e.responseJSON.status : e.responseText);
            }
        });
    },

    /* call on attribute edit button click - open edit panel */
    editAttribute: function (attribute, index, value, lang, preview) {
        if (!Editor.loggedIn) {
            Editor.savedEditData = [attribute, index, value, lang];
            Editor.login();
            return;
        }
        else
            Editor.savedEditData = null;

        let form = $('#editorModal');
        $("#result", form).html(null);
        let attr = attribute;
        if (index != null)
            attr += " [" + index + "]";
        $('#editorModalTitle', form).text("Modify attribute value: " + Editor.uri + "/" + attr);
        $('#newValue', form).val(value);
        $('#oldValue', form).val(value);
        $('#previewValue', form).val(preview);
        if (preview)
            $('#divPreviewValue', form).show();
        else
            $('#divPreviewValue', form).hide();
        $('#attribute', form).val(attribute);
        $('#index', form).val(index);
        $('#uri', form).val(Editor.uri);
        let langValue = $('#language', form);
        if (lang) {
            langValue.val(lang);
            $('#divLanguage', form).show();
        }
        else {
            langValue.val(null);
            $('#divLanguage', form).hide();
        }
        form.modal('toggle');
    },

    hasSpecChars: function(str) {
      const specChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specChars.test(str);
    },

    /* call on attribute save button click - POST to ticket database */
    saveAttribute: function () {
        let form = $('#editorModal');
        let newval = $("#newValue", form);
        $("#result", form).html(null);
        let uri = $("#uri", form).val();
        let oldValue = $("#oldValue", form).val();
        let newValue = newval.val();
        let attribute = $("#attribute", form).val();
        let index = $("#index", form).val();
        let language = $("#language", form).val();

        if (!Editor.loggedIn) {
            Editor.savedEditData = [attribute, index, newValue, language];
            Editor.login();
            return;
        }

        var e = /[$?'*#\\^{}<>]+/.exec(newValue);
        if (e != null) {
            var i = e.index;
            var elen = e[0].length;
            var j = e.index + elen;
            $("#result", form).html("New text may not contain following characters <b>$?'*#\\^{}</b>, please remove them before saving.");
            newval.get(0).focus();
            newval.get(0).setSelectionRange(i, j);
            return;
        }


        $.ajax({
            type: "POST",
            //url: "ws/write_topicCors.php",
            //url: "https://www.geolba.net/editor/ws/write_topicCors.php",
            url: "https://resource.geosphere.at/updatetool/ws/write_topicCors.php",
            data: { uri: uri, newValue: newValue, oldValue: oldValue, attribute: attribute, index: index, language: language },
            CORS: true,
            secure: true,
            beforeSend: function (xhr) {
                if (Editor.__authHeader)
                    xhr.setRequestHeader("Authorization", Editor.__authHeader);
            },
            success: function (data) {
                form.modal('hide');

                // refresh edit controls
                Editor.start(Editor.start);
            }, error: function (e) {
                $("#result", form).html(e.responseText);
            }
        });

        $.ajax({
          type: "POST",
          //url: "ws/mail.php",
          //url: "https://www.geolba.net/editor/ws/mail.php",
          url: "https://resource.geosphere.at/updatetool/ws/mail.php", //#TODO
          data: { send_email: true },
          success: function (data) {
              console.log(data); 
          },
          error: function (error) {
              console.error('Error:', error);
          }
      });
    },
    previewAttribute: function (attr, value, user) {
        let form = $('#previewModal');
        $('#previewModalTitle', form).text("Proposed attribute value: " + Editor.uri + "/" + attr);
        $('#previewValue', form).val(value);
        $('#user', form).val(user);
        form.modal('toggle');
    },
    
};



$(document).ready(function () {
    Editor.initialize();
});



