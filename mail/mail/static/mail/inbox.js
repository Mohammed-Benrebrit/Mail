document.addEventListener('DOMContentLoaded', function () {

  // use submit button to sent emails
  const form = document.getElementById('compose-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const recipients = document.getElementById('compose-recipients')
    const subject = document.getElementById('compose-subject')
    const body = document.getElementById('compose-body')


    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: `${recipients.value}`,
        subject: `${subject.value}`,
        body: `${body.value}`
      })
    })
      .then(response => response.json())
      .then(result => {
        // Print result
        console.log(result);
        sent_inbox()
        load_mailbox('sent')
      });
  });

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose_email('', '', ''));

  // 
  document.querySelector('#archived').addEventListener('click', () => archiv_inbox());
  document.querySelector('#inbox').addEventListener('click', () => show_inbox());
  document.querySelector('#sent').addEventListener('click', () => sent_inbox());
  document.querySelector('#e-inbox').addEventListener('mousedown', () => mail('#chiled',
    '<input class="btn btn-primary" type="submit" id="archiv" value="archiv" />',
    '<input class="btn btn-primary" type="submit" id="reply" value="reply" />'));
  document.querySelector('#e-inbox').addEventListener('mousedown', () => Read());
  document.querySelector('#s-inbox').addEventListener('mousedown', () => mail('#sent-m', '', ''));
  document.querySelector('#a-inbox').addEventListener('mousedown', () => mail('#archiv-m',
    '<input class="btn btn-primary" type="submit" id="unarchiv" value="unarchiv" />', ''));
  document.querySelector('#content').addEventListener('mousedown', () => archiv());
  document.querySelector('#content').addEventListener('mousedown', () => unarchiv());
  document.querySelector('#content').addEventListener('mousedown', () => reply());


  // By default, load the inbox
  load_mailbox('inbox');
  show_inbox();
});

function compose_email(rec, sub, body) {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#e-inbox').style.display = 'none';
  document.querySelector('#s-inbox').style.display = 'none';
  document.querySelector('#a-inbox').style.display = 'none';
  document.querySelector('#content').style.display = 'none';



  // Clear out composition fields
  document.querySelector('#compose-recipients').value = `${rec}`;
  document.querySelector('#compose-subject').value = `${sub}`;
  document.querySelector('#compose-body').value = `${body}`;

}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h1 id='h1'>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h1>`;

}


// mailbox 

function mail(load, button, button1) {
  const chil = document.querySelectorAll(`${load}`)
  chil.forEach(function (i) {
    i.addEventListener('click', function () {
      document.querySelector('#e-inbox').style.display = 'none';
      document.querySelector('#a-inbox').style.display = 'none';
      document.querySelector('#s-inbox').style.display = 'none';
      document.querySelector('#content').style.display = 'block';
      id = i.getAttribute('data-emailId')
      fetch(`/emails/${id}`)
        .then(response => response.json())
        .then(email => {
          // Print email
          console.log(email);

          // ... do something else with email ...
          load_mailbox('inbox')
          document.querySelector('#content').innerHTML = `<div id ='cont' data-Id ='${email.id}'> <div id='fline'> <div id='sender'><h5>${email.sender}</h5></div> <div id='timestamp'><p>${email.timestamp}</p></div></div> <div id='subject'><h5>${email.subject}</h5></div> <div id='body'>${email.body}</div> <div id='bu'>${button} ${button1}</div> </div>`
        });
      document.querySelector('#inbox').addEventListener('click', () => document.querySelector('#content').style.display = 'none')
      document.querySelector('#sent').addEventListener('click', () => document.querySelector('#content').style.display = 'none')
      document.querySelector('#archived').addEventListener('click', () => document.querySelector('#content').style.display = 'none')
    })
  })
}


//sent function
function sent_inbox() {
  t = document.querySelectorAll('#sent-m')
  t.forEach(function (i) {
    if (i) {
      document.querySelector('#sent-m').remove()
    }
  })
  document.querySelector('#s-inbox').style.display = 'block';
  document.querySelector('#a-inbox').style.display = 'none';
  document.querySelector('#e-inbox').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);

      // ... looping for each inbox...
      emails.forEach(function (i) {
        console.log(i)
        document.querySelector('#s-inbox').innerHTML += `<div id= 'sent-m' data-emailId ='${i.id}'> <div id='st'> <p>To: ${i.recipients}</p> <p>${i.timestamp}</p></div> <div><p>${i.subject}</p></div> </div>`
      });


    });
}

//archiv_inbod function
function archiv_inbox() {
  t = document.querySelectorAll('#archiv-m')
  t.forEach(function (i) {
    if (i) {
      document.querySelector('#archiv-m').remove()
    }
  })
  document.querySelector('#a-inbox').style.display = 'block';
  document.querySelector('#s-inbox').style.display = 'none';
  document.querySelector('#e-inbox').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  fetch('/emails/archive')
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);

      // ... looping for each inbox...
      emails.forEach(function (i) {
        console.log(i)
        document.querySelector('#a-inbox').innerHTML += `<div id= 'archiv-m' data-emailId ='${i.id}'> <div id='st'> <p> ${i.recipients}</p> <p>${i.timestamp}</p></div> <div><p>${i.subject}</p></div> </div>`

      });


    });
}

// archiv and unarchiv
function archiv() {
  document.querySelector('#archiv').addEventListener('click', () => {
    cle = document.querySelector('#cont')
    Id = cle.getAttribute('data-Id')
    fetch(`/emails/${Id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: true
      })
    })

    setTimeout(() => {
      load_mailbox('inbox')
      show_inbox()
      document.querySelector('#content').style.display = 'none'
    }, 200);

  })
}

function unarchiv() {
  document.querySelector('#unarchiv').addEventListener('click', () => {
    cle = document.querySelector('#cont')
    Id = cle.getAttribute('data-Id')
    console.log(Id)
    fetch(`/emails/${Id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: false
      })
    })
    setTimeout(() => {
      load_mailbox('inbox')
      show_inbox()
      document.querySelector('#content').style.display = 'none'
    }, 200);
  })
}

// Read
function Read() {
  const rea = document.querySelectorAll('#chiled')
  rea.forEach(function (i) {
    console.log(i)
    i.addEventListener('click', function () {
      id = i.getAttribute('data-emailId')
      fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          read: true
        })
      })
    })
  })
}

// reply 
function reply() {
  document.querySelector('#reply').addEventListener('click', () => {
    const sender0 = document.querySelector('#sender')
    let sender = sender0.innerText;

    const subject0 = document.querySelector('#subject')
    let subject = `Re: ${subject0.textContent.replace(/^Re: +/, "")}`;
    console.log(subject)

    const body0 = document.querySelector('#body')
    let body1 = body0.innerText;

    const timestamp0 = document.querySelector('#timestamp')
    let timestamp = timestamp0.innerText;
    body = `On ${timestamp} ${sender} wrot: "${body1}"`

    compose_email(sender, subject, body)
  })
}

//inbox function
function show_inbox() {
  t = document.querySelectorAll('#chiled')
  t.forEach(function (i) {
    if (i) {
      document.querySelector('#chiled').remove()
    }
  })

  document.querySelector('#e-inbox').style.display = 'block';
  document.querySelector('#a-inbox').style.display = 'none';
  document.querySelector('#s-inbox').style.display = 'none';
  document.querySelector('#content').style.display = 'none';

  document.querySelector('#compose-view').style.display = 'none';

  fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);

      // ... looping for each inbox...
      emails.forEach(function (i) {
        console.log(i)
        document.querySelector('#e-inbox').innerHTML += `<div class='r-${i.read}' id='chiled' data-emailId='${i.id}'> <div id='st'> <p>From: ${i.sender}</p> <p>${i.timestamp}</p></div>  <div><p>${i.subject}</p> </div> </div>`

      });
    });
}


