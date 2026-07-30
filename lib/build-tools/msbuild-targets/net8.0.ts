export function generate(params: any): string {
	return `<Project>
    <Target Name="CustomBeforeBuild" BeforeTargets="BeforeBuild">
        <Message Text="Running custom pre-build steps..." Importance="high" />
        <Exec Command="npm run generate-version" />
    </Target>
    
    <Target Name="CustomAfterBuild" AfterTargets="AfterBuild">
        <Message Text="Running custom post-build steps..." Importance="high" />
        <Copy SourceFiles="$(OutputPath)$(AssemblyName).dll" 
              DestinationFolder="$(SolutionDir)lib\" />
    </Target>
</Project>`;
}
