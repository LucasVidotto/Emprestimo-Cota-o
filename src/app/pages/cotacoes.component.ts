import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../components/navbar.component";

@Component({
  standalone: true,
  selector: 'app-cotacoes',
  imports: [CommonModule, HttpClientModule, NavbarComponent],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css',
})
export class CotacoesComponent implements OnInit {
  moedas: { nome: string; valor: number }[] = [];

  private http = inject(HttpClient);

  ngOnInit() {
    const dataHoje = new Date();
    const dataFormatada = this.formatarData(dataHoje); // 'MM-DD-YYYY'

    this.buscarCotacaoPTAX('USD', dataFormatada);
    this.buscarCotacaoPTAX('EUR', dataFormatada);
    this.buscarCotacaoPTAX('AUD', dataFormatada);
  }

  private formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${mes}-${dia}-${ano}`; // Formato: MM-DD-YYYY
  }

  private buscarCotacaoPTAX(sigla: string, data: string) {
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${sigla}'&@dataCotacao='${data}'&$format=json`;

    this.http.get<any>(url).subscribe((res) => {
      const cotacoes = res.value;
      console.log(res.value)
      if (cotacoes.length > 0) {
        const ultimaCotacao = cotacoes[cotacoes.length - 1];
        this.moedas.push({
          nome: sigla,
          valor: ultimaCotacao.cotacaoVenda,
        });
      }
    });
  }


}
