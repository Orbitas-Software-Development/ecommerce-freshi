using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateclientPriceList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientPriceList_PriceList_PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList");

            migrationBuilder.AlterColumn<int>(
                name: "PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPriceList_PriceList_PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList",
                column: "PriceListId",
                principalSchema: "oss-ecommerce",
                principalTable: "PriceList",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientPriceList_PriceList_PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList");

            migrationBuilder.AlterColumn<int>(
                name: "PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPriceList_PriceList_PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList",
                column: "PriceListId",
                principalSchema: "oss-ecommerce",
                principalTable: "PriceList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
