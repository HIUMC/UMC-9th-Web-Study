import './App.css';

function App() {
    return (
        <div className="p-8 space-y-8">
            {/* Text Styles Test */}
            <section className="space-y-4">
                <h1 className="text-heading-1 text-primary">Heading 1 - Primary</h1>
                <h2 className="text-heading-2 text-secondary">Heading 2 - Secondary</h2>
                <h3 className="text-heading-3 text-success">Heading 3 - Success</h3>
                <h4 className="text-heading-4 text-warning">Heading 4 - Warning</h4>

                <p className="text-body-large">Body Large - 큰 본문 텍스트입니다.</p>
                <p className="text-body-medium text-muted">Body Medium - 중간 본문 텍스트입니다.</p>
                <p className="text-body-small text-disabled">Body Small - 작은 본문 텍스트입니다.</p>

                <p className="text-caption">Caption - 캡션 텍스트입니다.</p>
                <p className="text-label">Label - 라벨 텍스트입니다.</p>
            </section>

            {/* Color Variations Test */}
            <section className="space-y-4">
                <h2 className="text-heading-3 mb-4">Color Variations</h2>

                <div className="flex gap-4 flex-wrap">
                    <div className="bg-primary text-white p-4 rounded">Primary Background</div>
                    <div className="bg-secondary text-white p-4 rounded">Secondary Background</div>
                    <div className="bg-success text-white p-4 rounded">Success Background</div>
                    <div className="bg-warning text-white p-4 rounded">Warning Background</div>
                    <div className="bg-error text-white p-4 rounded">Error Background</div>
                    <div className="bg-surface p-4 rounded border border-divider">Surface Background</div>
                    <div className="bg-card p-4 rounded border border-divider">Card Background</div>
                </div>
            </section>

            {/* Border Test */}
            <section className="space-y-4">
                <h2 className="text-heading-3 mb-4">Border Colors</h2>

                <div className="flex gap-4 flex-wrap">
                    <div className="border-2 border-primary p-4 rounded">Primary Border</div>
                    <div className="border-2 border-secondary p-4 rounded">Secondary Border</div>
                    <div className="border-2 border-success p-4 rounded">Success Border</div>
                    <div className="border-2 border-warning p-4 rounded">Warning Border</div>
                    <div className="border-2 border-error p-4 rounded">Error Border</div>
                    <div className="border-2 border-divider p-4 rounded">Divider Border</div>
                </div>
            </section>

            {/* Button Test */}
            <section className="space-y-4">
                <h2 className="text-heading-3 mb-4">Button Styles</h2>

                <div className="flex gap-4 flex-wrap">
                    <button className="text-button bg-primary text-white px-6 py-3 rounded hover:opacity-90">
                        Primary Button
                    </button>
                    <button className="text-button bg-secondary text-white px-6 py-3 rounded hover:opacity-90">
                        Secondary Button
                    </button>
                    <button className="text-button bg-success text-white px-6 py-3 rounded hover:opacity-90">
                        Success Button
                    </button>
                    <button className="text-button bg-error text-white px-6 py-3 rounded hover:opacity-90">
                        Error Button
                    </button>
                </div>
            </section>
        </div>
    );
}

export default App;