(self.webpackChunk=self.webpackChunk||[]).push([[4934],{4934:e=>{e.exports='<p>This guide contains some useful tips for improving build/compilation performance.</p> <hr> <h2 id="general">General<a href="#general" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>The following best practices should help, whether you\'re running build scripts in <a href="/guides/development">development</a> or <a href="/guides/production">production</a>.</p> <h3 id="stay-up-to-date">Stay Up to Date<a href="#stay-up-to-date" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Use the latest webpack version. We are always making performance improvements. The latest recommended version of webpack is:</p> <p><a href="https://github.com/webpack/webpack/releases"><img src="https://img.shields.io/github/package-json/v/webpack/webpack.svg?label=webpack&#x26;style=flat-square&#x26;maxAge=3600" alt="latest webpack version"></a></p> <p>Staying up-to-date with <strong>Node.js</strong> can also help with performance. On top of this, keeping your package manager (e.g. <code>npm</code> or <code>yarn</code>) up-to-date can also help. Newer versions create more efficient module trees and increase resolving speed.</p> <h3 id="loaders">Loaders<a href="#loaders" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Apply loaders to the minimal number of modules necessary. Instead of:</p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'babel-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>Use the <code>include</code> field to only apply the loader modules that actually need to be transformed by it:</p> <pre><code class="hljs language-js"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n        include<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'src\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'babel-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h3 id="bootstrap">Bootstrap<a href="#bootstrap" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Each additional loader/plugin has a bootup time. Try to use as few tools as possible.</p> <h3 id="resolving">Resolving<a href="#resolving" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>The following steps can increase resolving speed:</p> <ul> <li>Minimize the number of items in <code>resolve.modules</code>, <code>resolve.extensions</code>, <code>resolve.mainFiles</code>, <code>resolve.descriptionFiles</code>, as they increase the number of filesystem calls.</li> <li>Set <code>resolve.symlinks: false</code> if you don\'t use symlinks (e.g. <code>npm link</code> or <code>yarn link</code>).</li> <li>Set <code>resolve.cacheWithContext: false</code> if you use custom resolving plugins, that are not context specific.</li> </ul> <h3 id="dlls">Dlls<a href="#dlls" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Use the <code>DllPlugin</code> to move code that is changed less often into a separate compilation. This will improve the application\'s compilation speed, although it does increase complexity of the build process.</p> <h3 id="smaller--faster">Smaller = Faster<a href="#smaller--faster" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Decrease the total size of the compilation to increase build performance. Try to keep chunks small.</p> <ul> <li>Use fewer/smaller libraries.</li> <li>Use the <code>SplitChunksPlugin</code> in Multi-Page Applications.</li> <li>Use the <code>SplitChunksPlugin</code> in <code>async</code> mode in Multi-Page Applications.</li> <li>Remove unused code.</li> <li>Only compile the part of the code you are currently developing on.</li> </ul> <h3 id="worker-pool">Worker Pool<a href="#worker-pool" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>The <code>thread-loader</code> can be used to offload expensive loaders to a worker pool.</p> <blockquote class="warning"> <p>Don\'t use too many workers, as there is a boot overhead for the Node.js runtime and the loader. Minimize the module transfers between worker and main process. IPC is expensive.</p> </blockquote> <h3 id="persistent-cache">Persistent cache<a href="#persistent-cache" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Enable persistent caching with the <code>cache-loader</code>. Clear cache directory on <code>"postinstall"</code> in <code>package.json</code>.</p> <blockquote class="tip"> <p>We support yarn PnP version 3 <a href="https://next.yarnpkg.com/features/pnp"><code>yarn 2 berry</code></a> for persistent caching.</p> </blockquote> <h3 id="custom-pluginsloaders">Custom plugins/loaders<a href="#custom-pluginsloaders" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Profile them to not introduce a performance problem here.</p> <h3 id="progress-plugin">Progress plugin<a href="#progress-plugin" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>It is possible to shorten build times by removing <code>ProgressPlugin</code> from webpack\'s configuration. Keep in mind, <code>ProgressPlugin</code> might not provide as much value for fast builds as well, so make sure you are leveraging the benefits of using it.</p> <hr> <h2 id="development">Development<a href="#development" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>The following steps are especially useful in <em>development</em>.</p> <h3 id="incremental-builds">Incremental Builds<a href="#incremental-builds" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Use webpack\'s watch mode. Don\'t use other tools to watch your files and invoke webpack. The built-in watch mode will keep track of timestamps and passes this information to the compilation for cache invalidation.</p> <p>In some setups, watching falls back to polling mode. With many watched files, this can cause a lot of CPU load. In these cases, you can increase the polling interval with <code>watchOptions.poll</code>.</p> <h3 id="compile-in-memory">Compile in Memory<a href="#compile-in-memory" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>The following utilities improve performance by compiling and serving assets in memory rather than writing to disk:</p> <ul> <li><code>webpack-dev-server</code></li> <li><code>webpack-hot-middleware</code></li> <li><code>webpack-dev-middleware</code></li> </ul> <h3 id="statstojson-speed">stats.toJson speed<a href="#statstojson-speed" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>webpack 4 outputs a large amount of data with its <code>stats.toJson()</code> by default. Avoid retrieving portions of the <code>stats</code> object unless necessary in the incremental step. <code>webpack-dev-server</code> after v3.1.3 contained a substantial performance fix to minimize the amount of data retrieved from the <code>stats</code> object per incremental build step.</p> <h3 id="devtool">Devtool<a href="#devtool" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Be aware of the performance differences between the different <code>devtool</code> settings.</p> <ul> <li><code>"eval"</code> has the best performance, but doesn\'t assist you for transpiled code.</li> <li>The <code>cheap-source-map</code> variants are more performant if you can live with the slightly worse mapping quality.</li> <li>Use a <code>eval-source-map</code> variant for incremental builds.</li> </ul> <blockquote class="tip"> <p>In most cases, <code>eval-cheap-module-source-map</code> is the best option.</p> </blockquote> <h3 id="avoid-production-specific-tooling">Avoid Production Specific Tooling<a href="#avoid-production-specific-tooling" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Certain utilities, plugins, and loaders only make sense when building for production. For example, it usually doesn\'t make sense to minify and mangle your code with the <code>TerserPlugin</code> while in development. These tools should typically be excluded in development:</p> <ul> <li><code>TerserPlugin</code></li> <li><code>[fullhash]</code>/<code>[chunkhash]</code>/<code>[contenthash]</code></li> <li><code>AggressiveSplittingPlugin</code></li> <li><code>AggressiveMergingPlugin</code></li> <li><code>ModuleConcatenationPlugin</code></li> </ul> <h3 id="minimal-entry-chunk">Minimal Entry Chunk<a href="#minimal-entry-chunk" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>webpack only emits updated chunks to the filesystem. For some configuration options, (HMR, <code>[name]</code>/<code>[chunkhash]</code>/<code>[contenthash]</code> in <code>output.chunkFilename</code>, <code>[fullhash]</code>) the entry chunk is invalidated in addition to the changed chunks.</p> <p>Make sure the entry chunk is cheap to emit by keeping it small. The following configuration creates an additional chunk for the runtime code, so it\'s cheap to generate:</p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  optimization<span class="token operator">:</span> <span class="token punctuation">{</span>\n    runtimeChunk<span class="token operator">:</span> <span class="token boolean">true</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h3 id="avoid-extra-optimization-steps">Avoid Extra Optimization Steps<a href="#avoid-extra-optimization-steps" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>webpack does extra algorithmic work to optimize the output for size and load performance. These optimizations are performant for smaller codebases, but can be costly in larger ones:</p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  optimization<span class="token operator">:</span> <span class="token punctuation">{</span>\n    removeAvailableModules<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    removeEmptyChunks<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    splitChunks<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h3 id="output-without-path-info">Output Without Path Info<a href="#output-without-path-info" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules. Turn this off in the <code>options.output.pathinfo</code> setting:</p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  output<span class="token operator">:</span> <span class="token punctuation">{</span>\n    pathinfo<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h3 id="nodejs-versions-8910-9111">Node.js Versions 8.9.10-9.11.1<a href="#nodejs-versions-8910-9111" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>There was a <a href="https://github.com/nodejs/node/issues/19769">performance regression</a> in Node.js versions 8.9.10 - 9.11.1 in the ES2015 <code>Map</code> and <code>Set</code> implementations. webpack uses those data structures liberally, so this regression affects compile times.</p> <p>Earlier and later Node.js versions are not affected.</p> <h3 id="typescript-loader">TypeScript Loader<a href="#typescript-loader" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>To improve the build time when using <code>ts-loader</code>, use the <code>transpileOnly</code> loader option. On its own, this option turns off type checking. To gain type checking again, use the <a href="https://www.npmjs.com/package/fork-ts-checker-webpack-plugin"><code>ForkTsCheckerWebpackPlugin</code></a>. This speeds up TypeScript type checking and ESLint linting by moving each to a separate process.</p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  test<span class="token operator">:</span> <span class="token regex">/\\.tsx?$/</span><span class="token punctuation">,</span>\n  use<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      loader<span class="token operator">:</span> <span class="token string">\'ts-loader\'</span><span class="token punctuation">,</span>\n      options<span class="token operator">:</span> <span class="token punctuation">{</span>\n        transpileOnly<span class="token operator">:</span> <span class="token boolean">true</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <blockquote class="tip"> <p>There is a <a href="https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin">full example</a> on the <code>ts-loader</code> GitHub repository.</p> </blockquote> <hr> <h2 id="production">Production<a href="#production" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>The following steps are especially useful in <em>production</em>.</p> <blockquote class="warning"> <p><strong>Don\'t sacrifice the quality of your application for small performance gains!</strong> Keep in mind that optimization quality is, in most cases, more important than build performance.</p> </blockquote> <h3 id="multiple-compilations">Multiple Compilations<a href="#multiple-compilations" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>When using multiple compilations, the following tools can help:</p> <ul> <li><a href="https://github.com/trivago/parallel-webpack"><code>parallel-webpack</code></a>: It allows for compilation in a worker pool.</li> <li><code>cache-loader</code>: The cache can be shared between multiple compilations.</li> </ul> <h3 id="source-maps">Source Maps<a href="#source-maps" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Source maps are really expensive. Do you really need them?</p> <hr> <h2 id="specific-tooling-issues">Specific Tooling Issues<a href="#specific-tooling-issues" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>The following tools have certain problems that can degrade build performance:</p> <h3 id="babel">Babel<a href="#babel" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <ul> <li>Minimize the number of preset/plugins</li> </ul> <h3 id="typescript">TypeScript<a href="#typescript" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <ul> <li>Use the <code>fork-ts-checker-webpack-plugin</code> for typechecking in a separate process.</li> <li>Configure loaders to skip typechecking.</li> <li>Use the <code>ts-loader</code> in <code>happyPackMode: true</code> / <code>transpileOnly: true</code>.</li> </ul> <h3 id="sass">Sass<a href="#sass" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <ul> <li><code>node-sass</code> has a bug which blocks threads from the Node.js thread pool. When using it with the <code>thread-loader</code> set <code>workerParallelJobs: 2</code>.</li> </ul> '}}]);