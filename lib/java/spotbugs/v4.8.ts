export function generate(params: any): string {
	return `<FindBugsFilter>
    <Match>
        <Bug pattern="EI_EXPOSE_REP" />
    </Match>
    <Match>
        <Bug pattern="EI_EXPOSE_REP2" />
    </Match>
    <Match>
        <Class name="com.example.generated" />
        <Bug pattern="ALL" />
    </Match>
    <Match>
        <Class name="~.*\\.entities\\..*" />
        <Bug code="EI" />
    </Match>
    <Match>
        <Package name="~.*\\.dto\\..*" />
        <Bug code="EI" />
    </Match>
</FindBugsFilter>`;
}
