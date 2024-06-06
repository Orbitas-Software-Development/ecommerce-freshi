using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updatePricelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PriceListId",
                schema: "oss-ecommerce",
                table: "PriceList",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "CurrencyId",
                schema: "oss-ecommerce",
                table: "PriceList",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PriceList_CurrencyId",
                schema: "oss-ecommerce",
                table: "PriceList",
                column: "CurrencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PriceList_Currency_CurrencyId",
                schema: "oss-ecommerce",
                table: "PriceList",
                column: "CurrencyId",
                principalSchema: "oss-ecommerce",
                principalTable: "Currency",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PriceList_Currency_CurrencyId",
                schema: "oss-ecommerce",
                table: "PriceList");

            migrationBuilder.DropIndex(
                name: "IX_PriceList_CurrencyId",
                schema: "oss-ecommerce",
                table: "PriceList");

            migrationBuilder.DropColumn(
                name: "CurrencyId",
                schema: "oss-ecommerce",
                table: "PriceList");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "oss-ecommerce",
                table: "PriceList",
                newName: "PriceListId");
        }
    }
}
