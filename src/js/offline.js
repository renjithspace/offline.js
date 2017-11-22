(function() {

    this.Offline = function() {

        // Options
        this.options = {
            notify: 'Oops! No internet connection',
            timeout: 7000,
        };

        // Extend default options
        if (arguments.length && typeof arguments[0] === 'object') {
            setOptions(this.options, arguments[0]);
        }

        // Set options
        function setOptions(options, args) {
            for (let arg in args) {
                if (options.hasOwnProperty(arg)) {
                    options[arg] = args[arg];
                }
            }
        }

        /**
        *----------------
        * Private Methods
        *----------------
        *
        */

        var self = this;

        // Block
        var block = function() {

            // Create blocker wrapper
            var blocker = document.createElement('div');
            blocker.className = 'offline-blocker';

            // Create notification
            var notify = document.createElement('p');
            notify.innerHTML = self.options.notify;
            blocker.appendChild(notify);

            // Append
            if (!document.querySelectorAll('.offline-blocker').length) {
                document.body.appendChild(blocker);
            }
        };

        // Unblock
        var unblock = function() {

            // Remove blocker
            var blocker = document.querySelector('.offline-blocker');
            if (blocker) {
                blocker.parentNode.removeChild(blocker);
            }
        };

        // Check
        var check = function() {

            if (navigator.onLine) {

                // Make AJAX request
                var request = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
                var rand = Math.floor((1 + Math.random()) * 1000);
                request.open( "HEAD", "//" + window.location.hostname + "/?rand=" + rand, false );

                // Try request status
                try {
                    request.send();
                    if (request.status == 200) {
                        unblock();
                    }
                } catch (error) {
                    block();
                }
            } else {
                block();
            }

        };

        // Invoke
        setInterval(check, this.options.timeout);
    };
}());
