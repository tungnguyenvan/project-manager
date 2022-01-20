class FrameworkApplication {
    private static _instance?: FrameworkApplication = undefined;

    static get instance(): FrameworkApplication {
        if (this._instance === undefined) {
            this._instance = new FrameworkApplication();
        }

        return this._instance;
    }

    initialize(): void {

    }
}

export default FrameworkApplication;