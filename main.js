// Configure recurly.js
recurly.configure({
    publicKey: 'sjc-TOOYYr5w9dNBTKsaqAOLDW',
    style: {
      all: {
        fontFamily: 'Open Sans',
        fontSize: '1rem',
        fontWeight: 'bold',
        fontColor: '#2c0730'
      },
      number: {
        placeholder: 'XXXX-XXXX-XXXX-XXXX'
      },
      month: {
        placeholder: 'mm'
      },
      year: {
        placeholder: 'yy'
      },
      cvv: {
        placeholder: 'XXX'
      }
    }
});

recurly.on('field:submit', function (event) {
   $('form').submit(); 
});

$('form').on('submit', function(event) {
    var form = this;
    event.preventDefault();
    
    // Reset error display
    $('#errors').text('');
    $('input').removeClass('error');
    
    // Disable the submit button
    $('button').prop('disabled', true);
    
    recurly.token(form, function (err, token) {
        if (err) error(err);
        else form.submit();
    });
});

function error (err) {
    $('#errors').text('The following fields appear to be invalid: ' + err.fields.join(', '));
    $('button').prop('disabled', false);
    $.each(err.fields, function (i, field) {
        $('[data-recurly=' + field + ']').addClass('error');
    });
}