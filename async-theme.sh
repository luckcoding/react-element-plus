git clone -b 1.0.2-beta.40 --depth=1 https://github.com/element-plus/element-plus.git
rm -rf components/theme-chalk
mv element-plus/packages/theme-chalk ./components/
rm -rf element-plus