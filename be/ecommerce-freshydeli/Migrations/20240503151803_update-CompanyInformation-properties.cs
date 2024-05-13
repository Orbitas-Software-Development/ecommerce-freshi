using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateCompanyInformationproperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "parameterizableText",
                schema: "oss-ecommerce",
                table: "CompanyInformation",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Client_PersonId",
                schema: "oss-ecommerce",
                table: "Client",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Person_PersonId",
                schema: "oss-ecommerce",
                table: "Client",
                column: "PersonId",
                principalSchema: "oss-ecommerce",
                principalTable: "Person",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Person_PersonId",
                schema: "oss-ecommerce",
                table: "Client");

            migrationBuilder.DropIndex(
                name: "IX_Client_PersonId",
                schema: "oss-ecommerce",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "parameterizableText",
                schema: "oss-ecommerce",
                table: "CompanyInformation");
        }
    }
}
