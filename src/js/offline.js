(function() {

    this.Offline = function() {

        // Options
        this.options = {
            notify: 'Opps! No internet connection',
            timeout: 10000,
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
    };
}());
