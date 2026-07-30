export function generate(params: any): string {
	return `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="Microsoft Visual Studio Offline Packages" value="C:\\Program Files (x86)\\Microsoft SDKs\\NuGetPackages\\" />
  </packageSources>
  
  <packageRestore>
    <add key="enabled" value="True" />
    <add key="automatic" value="True" />
  </packageRestore>
  
  <packageManagement>
    <add key="format" value="0" />
    <add key="disabled" value="false" />
  </packageManagement>
  
  <config>
    <add key="globalPackagesFolder" value=".packages" />
    <add key="repositoryPath" value=".packages" />
    <add key="dependencyVersion" value="Highest" />
  </config>
</configuration>`;
}
